import express from "express";
import * as transactionsFunctions from "../functions/transactions";

const routes = express.Router();

routes.post("/invest", (req, res)=>{

    let data = req.body;

    if(!data.amount){
        return res.status(400).send("amount parametr is required");
    }
    if(!data.type){
        return res.status(400).send("type parametr is required");
    }
    if(!data.wallet){
        return res.status(400).send("wallet parametr is required");
    }

    transactionsFunctions.InvestEth(data.amount, data.type, data.wallet, data.days, data.percents, data.hash).then((doc: any)=>{
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

    transactionsFunctions.List(wallet, page).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.get("/balance", (req, res)=>{

    let wallet = req.query.wallet;

    if(!wallet){
        return res.status(400).send("wallet parametr is required");
    }

    transactionsFunctions.GetBalance(wallet).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.post("/withdraw-dividents", (req, res)=>{

    let data = req.body;

    if(!data.wallet){
        return res.status(400).send("wallet parametr is required");
    }

    if(!data.amount){
        return res.status(400).send("amount parametr is required");
    }

    transactionsFunctions.WithdrawReword(data.wallet, data.amount).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.post("/withdraw-all", (req, res)=>{

    let data = req.body;

    if(!data.wallet){
        return res.status(400).send("wallet parametr is required");
    }

    transactionsFunctions.WithdrawAll(data.wallet).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

routes.get("/dividents", (req, res)=>{

    let wallet = req.query.wallet;

    if(!wallet){
        return res.status(400).send("wallet parametr is required");
    }

    transactionsFunctions.GetDividents(wallet).then((doc: any)=>{
        return res.status(200).send(doc);
    }).catch((err)=>{
        return res.status(err.code ? err.code: 403).send(err);
    });
   
});

export default routes;