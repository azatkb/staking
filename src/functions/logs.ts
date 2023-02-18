import * as logsDb from "../database/logs";

export const CreateLog = (ip: string, wallet: string, type: string)=>{
    return new Promise((resolve, reject)=>{
        logsDb.CreateLog(ip, wallet, type).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export const GetLogs = (wallet: string, page: number)=>{
    return new Promise((resolve, reject)=>{
        logsDb.GetLogs(wallet, page).then((saved: any)=>{
            resolve(saved)
        }).catch((err)=>{
            reject(err);
        });
    });
}