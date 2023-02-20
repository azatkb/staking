import Transaction from "../models/Transaction";
import Wallet from "../models/Wallet";
import Balance from "../models/Balance";
import Invest from "../models/Invest";

export const InvestEth = (amount: number, type: string, wallet: string, days: number, percents: number, hash: string) => {
    return new Promise((resolve, reject) => {

        Invest.findOne({ wallet: wallet }, (err, invest: any) => {

            if (invest) {

                let today = new Date();
                let day_pass = dateDiffInDays(invest.start, today);
                let revord_per_day = calculate(invest.amount, invest.percents);
                let reword = revord_per_day * day_pass;
                let new_amount =  parseFloat(invest.amount) + amount;
                Invest.updateOne({ wallet: wallet }, { $set: { start: today, days: days, amount: new_amount } })
                .exec((err, mod) => {
                    new Transaction({ amount: amount, type: type, wallet: wallet, hash: hash }).save((err, saved) => {
                    if(reword > 0){
                        new Transaction({ amount: -reword, type: "withdraw", wallet: wallet })
                            .save((err, saved) => {
                                resolve({ code: 200, msg: "Msg updated!" });
                            });
                    }else{
                        resolve({ code: 200, msg: "Msg updated!" });
                    }
                });
                })

            } else {
                new Invest({ wallet: wallet, amount: amount, days: days, percents: percents, start: new Date() })
                    .save((err, saved) => {

                        new Transaction({ amount: amount, type: type, wallet: wallet, hash: hash })
                            .save((err, saved) => {
                                if (!err) {
                                    resolve({ code: 200, msg: "Invested!" });
                                }
                                else {
                                    reject({ code: 500 });
                                }

                            });
                    });
            }
        })

    });
}

export const List = (wallet: string, page: number) => {
    return new Promise((resolve, reject) => {
        Transaction.count({}, (err, count) => {
            Transaction.find({ wallet: wallet })
                .limit(10)
                .skip(10 * page)
                .sort({ createdAt: -1 })
                .exec((err, docs) => {
                    if (!err) {
                        resolve({
                            list: docs,
                            count: count
                        });
                    } else {
                        reject(err);
                    }
                });
        });
    });
}

const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const calculate = (val, percent) => {
    return (val * percent) / 100;
}

export const GetBalance = (wallet: string) => {
    return new Promise((resolve, reject) => {
        let total = 0;
        let available = 0;
        Invest.findOne({ wallet: wallet }, (err, invest: any) => {
            if (invest) {
                let today = new Date();
                let day_pass = dateDiffInDays(invest.start, today);
                let revord_per_day = calculate(invest.amount, invest.percents);
                let reword = revord_per_day * day_pass;
                total = invest.amount + reword;
                resolve({ total: total, available: reword });
            } else {
                resolve({ total: total, available: available, wallet: wallet });
            }
        });
    });
}

export const WithdrawReword = (wallet: string, amount: number) => {
    return new Promise((resolve, reject) => {
        Invest.findOne({ wallet: wallet }, (err, invest: any) => {
            if (invest) {
                let today = new Date();
                let day_pass = dateDiffInDays(invest.start, today);
                Invest.updateOne({ wallet: wallet }, { $set: { start: today, days: invest.days - day_pass } })
                    .exec((err, mod) => {
                        if (!err) {
                            new Transaction({ amount: -amount, type: "withdraw", wallet: wallet })
                                .save((err, saved) => {
                                    resolve({ code: 200, msg: "Msg updated!" });
                                });
                        } else {
                            reject({ code: 404, msg: "Invest not found!" });
                        }
                    });
            } else {
                reject({ code: 404, msg: "Invest not found!" });
            }
        });
    });
}

export const WithdrawAll = (wallet: string) => {
    return new Promise((resolve, reject) => {
        GetBalance(wallet).then((balance: any) => {
            new Transaction({ amount: - balance.total, type: "withdraw", wallet: wallet })
                .save((err, saved) => {
                    Invest.remove({ wallet: wallet }, (err) => {
                        resolve({ code: 200, msg: "removed!" });
                    });
                });
        });
    });
}

const SaveBalance = (wallet, amount) => {
    return new Promise((resolve, reject) => {
        new Balance({ wallet: wallet, amount: amount })
            .save((err, saved) => {
                if (!err) {
                    resolve(saved);
                } else {
                    reject(err);
                }
            });
    });
}


export const CalcBalances = () => {
    return new Promise((resolve, reject) => {
        Wallet.find()
            .exec((err, wallets) => {
                if (!err) {
                    let tasks = wallets.map((w) => {
                        return GetBalance(w.wallet);
                    });
                    Promise.all(tasks).then((balances) => {
                        console.log(balances)
                        let save_tasks = balances.map((b: any) => {
                            return SaveBalance(b.wallet, b.total);
                        });
                        Promise.all(save_tasks).then((res) => {
                            resolve(res);
                        });
                    });
                } else {
                    reject({ code: 500, msg: "Internal server error." });
                }
            });
    });
}

export const GetDividents = (wallet: string) => {
    return new Promise((resolve, reject) => {
        Balance.find({ wallet: wallet }, (err, balances) => {
            let graph = [];
            balances.forEach((b: any) => {
                let d = new Date(b.createdAt);
                let item = {
                    y: b.amount,
                    label: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
                }
                graph.push(item);
            });
            resolve(graph);
        });
    });
}


