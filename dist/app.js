"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var logs_1 = __importDefault(require("./routes/logs"));
var transactions_1 = __importDefault(require("./routes/transactions"));
var secrets_1 = require("./util/secrets");
var transactions_2 = require("./database/transactions");
var CronJob = require('cron').CronJob;
console.log(secrets_1.MONGODB_URI);
exports.app = express_1["default"]();
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
exports.app.set("port", secrets_1.PORT);
exports.app.use(body_parser_1["default"].json());
exports.app.use(body_parser_1["default"].urlencoded({ extended: true }));
mongoose_1["default"].connect(secrets_1.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(function (err) {
    console.log("Site ready");
})["catch"](function (err) {
    console.log(err);
});
// Routes
exports.app.use("/api/logs", logs_1["default"]);
exports.app.use("/api/transactions", transactions_1["default"]);
var job = new CronJob('0 0 0 * * *', function () {
    transactions_2.CalcBalances();
}, null, true, 'America/Los_Angeles');
job.start();
//# sourceMappingURL=app.js.map