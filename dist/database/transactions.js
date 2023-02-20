"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetDividents = exports.CalcBalances = exports.WithdrawAll = exports.WithdrawReword = exports.GetBalance = exports.List = exports.InvestEth = void 0;
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Wallet_1 = __importDefault(require("../models/Wallet"));
var Balance_1 = __importDefault(require("../models/Balance"));
var Invest_1 = __importDefault(require("../models/Invest"));
exports.InvestEth = function (amount, type, wallet, days, percents, hash) {
    return new Promise(function (resolve, reject) {
        Invest_1["default"].findOne({ wallet: wallet }, function (err, invest) {
            if (invest) {
                var today = new Date();
                var day_pass = dateDiffInDays(invest.start, today);
                var revord_per_day = calculate(invest.amount, invest.percents);
                var reword_1 = revord_per_day * day_pass;
                var new_amount = parseFloat(invest.amount) + amount;
                Invest_1["default"].updateOne({ wallet: wallet }, { $set: { start: today, days: days, amount: new_amount } })
                    .exec(function (err, mod) {
                    new Transaction_1["default"]({ amount: amount, type: type, wallet: wallet, hash: hash }).save(function (err, saved) {
                        if (reword_1 > 0) {
                            new Transaction_1["default"]({ amount: -reword_1, type: "withdraw", wallet: wallet })
                                .save(function (err, saved) {
                                resolve({ code: 200, msg: "Msg updated!" });
                            });
                        }
                        else {
                            resolve({ code: 200, msg: "Msg updated!" });
                        }
                    });
                });
            }
            else {
                new Invest_1["default"]({ wallet: wallet, amount: amount, days: days, percents: percents, start: new Date() })
                    .save(function (err, saved) {
                    new Transaction_1["default"]({ amount: amount, type: type, wallet: wallet, hash: hash })
                        .save(function (err, saved) {
                        if (!err) {
                            resolve({ code: 200, msg: "Invested!" });
                        }
                        else {
                            reject({ code: 500 });
                        }
                    });
                });
            }
        });
    });
};
exports.List = function (wallet, page) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].count({}, function (err, count) {
            Transaction_1["default"].find({ wallet: wallet })
                .limit(10)
                .skip(10 * page)
                .sort({ createdAt: -1 })
                .exec(function (err, docs) {
                if (!err) {
                    resolve({
                        list: docs,
                        count: count
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
var dateDiffInDays = function (a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
var calculate = function (val, percent) {
    return (val * percent) / 100;
};
exports.GetBalance = function (wallet) {
    return new Promise(function (resolve, reject) {
        var total = 0;
        var available = 0;
        Invest_1["default"].findOne({ wallet: wallet }, function (err, invest) {
            if (invest) {
                var today = new Date();
                var day_pass = dateDiffInDays(invest.start, today);
                var revord_per_day = calculate(invest.amount, invest.percents);
                var reword = revord_per_day * day_pass;
                total = invest.amount + reword;
                resolve({ total: total, available: reword });
            }
            else {
                resolve({ total: total, available: available, wallet: wallet });
            }
        });
    });
};
exports.WithdrawReword = function (wallet, amount) {
    return new Promise(function (resolve, reject) {
        Invest_1["default"].findOne({ wallet: wallet }, function (err, invest) {
            if (invest) {
                var today = new Date();
                var day_pass = dateDiffInDays(invest.start, today);
                Invest_1["default"].updateOne({ wallet: wallet }, { $set: { start: today, days: invest.days - day_pass } })
                    .exec(function (err, mod) {
                    if (!err) {
                        new Transaction_1["default"]({ amount: -amount, type: "withdraw", wallet: wallet })
                            .save(function (err, saved) {
                            resolve({ code: 200, msg: "Msg updated!" });
                        });
                    }
                    else {
                        reject({ code: 404, msg: "Invest not found!" });
                    }
                });
            }
            else {
                reject({ code: 404, msg: "Invest not found!" });
            }
        });
    });
};
exports.WithdrawAll = function (wallet) {
    return new Promise(function (resolve, reject) {
        exports.GetBalance(wallet).then(function (balance) {
            new Transaction_1["default"]({ amount: -balance.total, type: "withdraw", wallet: wallet })
                .save(function (err, saved) {
                Invest_1["default"].remove({ wallet: wallet }, function (err) {
                    resolve({ code: 200, msg: "removed!" });
                });
            });
        });
    });
};
var SaveBalance = function (wallet, amount) {
    return new Promise(function (resolve, reject) {
        new Balance_1["default"]({ wallet: wallet, amount: amount })
            .save(function (err, saved) {
            if (!err) {
                resolve(saved);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.CalcBalances = function () {
    return new Promise(function (resolve, reject) {
        console.log("1");
        Wallet_1["default"].find()
            .exec(function (err, wallets) {
            console.log(wallets);
            if (!err) {
                var tasks = wallets.map(function (w) {
                    return exports.GetBalance(w.wallet);
                });
                Promise.all(tasks).then(function (balances) {
                    console.log(balances);
                    var save_tasks = balances.map(function (b) {
                        return SaveBalance(b.wallet, b.total);
                    });
                    Promise.all(save_tasks).then(function (res) {
                        resolve(res);
                    });
                });
            }
            else {
                reject({ code: 500, msg: "Internal server error." });
            }
        });
    });
};
exports.GetDividents = function (wallet) {
    return new Promise(function (resolve, reject) {
        Balance_1["default"].find({ wallet: wallet }, function (err, balances) {
            var graph = [];
            balances.forEach(function (b) {
                var d = new Date(b.createdAt);
                var item = {
                    y: b.amount,
                    label: d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
                };
                graph.push(item);
            });
            resolve(graph);
        });
    });
};
//# sourceMappingURL=transactions.js.map