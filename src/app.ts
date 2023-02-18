import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logsRoutes  from "./routes/logs"; 
import transactionsRoutes  from "./routes/transactions"; 
import { MONGODB_URI, PORT } from "./util/secrets";
import { CalcBalances } from "./database/transactions";
const CronJob = require('cron').CronJob;

export const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.set("port", PORT);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(err => {
   console.log("Site ready")
}).catch((err)=>{
    console.log(err)
});

// Routes

app.use("/api/logs", logsRoutes);
app.use("/api/transactions", transactionsRoutes);

let job = new CronJob('0 0 0 * * *',function() {
    CalcBalances();
},
null,
true,
'America/Los_Angeles'
);

job.start()

