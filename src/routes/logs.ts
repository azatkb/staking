import express from "express";
import * as logsFunctions from "../functions/logs";
import requestIp from "request-ip";

const routes = express.Router();

routes.post("/create", (req, res)=>{

    let data = req.body;

    const client_ip = requestIp.getClientIp(req);

    if(!data.type){
        return res.status(400).send("type parametr is required");
    }
    if(!data.wallet){
        return res.status(400).send("wallet parametr is required");
    }

    logsFunctions.CreateLog(client_ip, data.wallet,  data.type).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.get("/list", (req, res)=>{

    let wallet = req.query.wallet;
    let page = req.query.page? parseInt(req.query.page) : 0;

    if(!wallet){
        return res.status(400).send("wallet parametr is required");
    }

    logsFunctions.GetLogs(wallet, page).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

export default routes;