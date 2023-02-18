"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var transactionsFunctions = __importStar(require("../functions/transactions"));
var routes = express_1["default"].Router();
routes.post("/invest", function (req, res) {
    var data = req.body;
    if (!data.amount) {
        return res.status(400).send("amount parametr is required");
    }
    if (!data.type) {
        return res.status(400).send("type parametr is required");
    }
    if (!data.wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    transactionsFunctions.InvestEth(data.amount, data.type, data.wallet, data.days, data.percents, data.hash).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/list", function (req, res) {
    var wallet = req.query.wallet;
    var page = req.query.page ? parseInt(req.query.page) : 0;
    if (!wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    transactionsFunctions.List(wallet, page).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/balance", function (req, res) {
    var wallet = req.query.wallet;
    if (!wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    transactionsFunctions.GetBalance(wallet).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/withdraw-dividents", function (req, res) {
    var data = req.body;
    if (!data.wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    if (!data.amount) {
        return res.status(400).send("amount parametr is required");
    }
    transactionsFunctions.WithdrawReword(data.wallet, data.amount).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/withdraw-all", function (req, res) {
    var data = req.body;
    if (!data.wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    transactionsFunctions.WithdrawAll(data.wallet).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/dividents", function (req, res) {
    var wallet = req.query.wallet;
    if (!wallet) {
        return res.status(400).send("wallet parametr is required");
    }
    transactionsFunctions.GetDividents(wallet).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=transactions.js.map