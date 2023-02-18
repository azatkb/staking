import * as transactionsDb from "../database/transactions";

export const InvestEth = (amount: number, type: string, wallet: string, days: number, percents: number, hash: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.InvestEth(amount, type, wallet, days, percents, hash).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const List = (wallet: string, page: number)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.List(wallet, page).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetBalance = (wallet: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.GetBalance(wallet).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const WithdrawReword = (wallet: string, amount: number)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.WithdrawReword(wallet, amount).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const WithdrawAll = (wallet: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.WithdrawAll(wallet).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}


export const GetDividents = (wallet: string)=>{
    return new Promise((resolve, reject)=>{
        transactionsDb.GetDividents(wallet).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}