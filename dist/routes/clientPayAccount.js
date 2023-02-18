"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var clientPayAccountunctions = __importStar(require("../functions/clientPayAccount"));
var auth_1 = require("../config/auth");
var routes = express_1["default"].Router();
routes.post("/deposit", function (req, res) {
    var data = req.body;
    if (data.status && ((data.status === "completed") || (data.status === "pending"))) {
        clientPayAccountunctions.Deposit(data.address, data.currency, data.amount).then(function (doc) {
            return res.status(200).send(doc);
        })["catch"](function (err) {
            return res.status(403).send(err);
        });
    }
    else {
        return res.status(400).send({ code: 400, msg: "unknown error" });
    }
});
routes.get("/get-purses", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    clientPayAccountunctions.GetUserClientPayAccounts(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/withdraw", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    var data = req.body;
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.currency) {
        return res.status(400).send("currency parametr is required");
    }
    if (!data.amount) {
        return res.status(400).send("amount parametr is required");
    }
    clientPayAccountunctions.Withdraw(user_id, data.address, data.currency, data.amount).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/withdraw-orders", auth_1.isAdmin, function (req, res) {
    clientPayAccountunctions.GetUserWithdrawOrders().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/confirm-withdraw", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    clientPayAccountunctions.ConfirmWithdrawOrder(data.order_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-history", auth_1.isAuthenticated, function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    clientPayAccountunctions.GetHistory(address).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-history", auth_1.isAuthenticated, function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.status(400).send("address parametr is required");
    }
    clientPayAccountunctions.GetHistory(address).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/referal-earned", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    clientPayAccountunctions.ReferalEarned(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=clientPayAccount.js.map