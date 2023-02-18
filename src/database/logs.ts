import Log from "../models/Log";
import Wallet from "../models/Wallet";

export const CreateLog = (ip: string, wallet: string, type: string)=>{
    return new Promise((resolve, reject)=>{
        new Log({ ip: ip, wallet: wallet, type: type })
        .save((err, saved)=>{
            if(!err){
                Wallet.find({ wallet: wallet },(err, wallets)=>{
                    if(wallets.length){
                        resolve({ code: 200, msg: "log sent." });
                    }else{
                        new Wallet({ wallet: wallet })
                        .save((err, saved)=>{
                            resolve({ code: 200, msg: "log sent." });
                        });
                    }
                });
            }else{
                reject({ code: 500 });
            }
        });
    });
}

export const GetLogs = (wallet: string, page: number)=>{
    return new Promise((resolve, reject)=>{
        Log.count({},( err, count)=>{
            Log.find({ wallet: wallet })
            .limit(10)
            .skip(10 * page)
            .sort({createdAt: -1})
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


