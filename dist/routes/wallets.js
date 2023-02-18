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
var auth_1 = require("../config/auth");
var walletFunctions = __importStar(require("../functions/wallets"));
var rates_1 = require("../rates");
var routes = express_1["default"].Router();
routes.get("/rates", function (req, res) {
    rates_1.GetRates().then(function (rates) {
        return res.status(200).send(rates);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/create", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    var data = req.body;
    if (!data.address) {
        return res.status(400).send("address parametr is required");
    }
    walletFunctions.CreateAddress(user_id, data.address).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/delete", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    walletFunctions.Delete(data._id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/balance", auth_1.isAuthenticated, function (req, res) {
    var user_id = req.query.id;
    if (!user_id) {
        user_id = req["token"]._id;
    }
    walletFunctions.GetBalance(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/profit", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    walletFunctions.GetProfit(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/wallets", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    walletFunctions.Wallets(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/wallets-admin", auth_1.isAdmin, function (req, res) {
    var user_id = req.query.id;
    walletFunctions.Wallets(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=wallets.js.map