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
var auth_1 = require("../config/auth");
var clientOrdersFunctions = __importStar(require("../functions/clientOrders"));
var routes = express_1["default"].Router();
routes.post("/sell", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.client_pay_id_purse) {
        return res.status(400).send("client_pay_id_purse parametr is required");
    }
    if (!data.amount_to_sell) {
        return res.status(400).send("amount_to_sell parametr is required");
    }
    if (!data.rate) {
        return res.status(400).send("rate parametr is required");
    }
    if (!data.hasOwnProperty('all_amount')) {
        return res.status(400).send("all_amount parametr is required");
    }
    if (!data.hasOwnProperty('for_verified')) {
        return res.status(400).send("for_verified parametr is required");
    }
    if (!data.receive_type) {
        return res.status(400).send("receive_type parametr is required");
    }
    clientOrdersFunctions.CreateOrderSell(userId, data.client_pay_id_purse, data.amount_to_sell, data.rate, data.all_amount, data.for_verified, data.receive_type, data.props, data.cash_props, data.time_to_live, data.note).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/buy", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.amount_to_buy) {
        return res.status(400).send("amount_to_buy parametr is required");
    }
    if (!data.rate) {
        return res.status(400).send("rate parametr is required");
    }
    if (!data.hasOwnProperty('for_verified')) {
        return res.status(400).send("all_amount parametr is required");
    }
    if (!data.hasOwnProperty('client_pay_id_purse')) {
        return res.status(400).send("client_pay_id_purse parametr is required");
    }
    if (!data.hasOwnProperty('receive_type')) {
        return res.status(400).send("receive_type parametr is required");
    }
    clientOrdersFunctions.CreateOrderBuy(userId, data.for_verified, data.time_to_live, data.note, data.rate, data.amount_to_buy, data.props, data.cash_props, data.client_pay_id_purse, data.receive_type).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/sell-orders", function (req, res) {
    var to_buy_currency = req.query.buy;
    var to_sell_currency = req.query.sell;
    var country = req.query.country;
    var amount_to_sell = req.query.amount;
    var page = req.query.page ? parseInt(req.query.page) : 0;
    clientOrdersFunctions.SellOrders(page, to_buy_currency, to_sell_currency, country, amount_to_sell).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/buy-orders", function (req, res) {
    var to_buy_currency = req.query.buy;
    var to_sell_currency = req.query.sell;
    var country = req.query.country;
    var amount_to_buy = req.query.amount;
    var page = req.query.page ? parseInt(req.query.page) : 0;
    clientOrdersFunctions.BuyOrders(page, to_buy_currency, to_sell_currency, country, amount_to_buy).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/orders", auth_1.isAdmin, function (req, res) {
    var page = req.query.page ? parseInt(req.query.page) : 0;
    clientOrdersFunctions.Orders(page).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/accept-sell-order", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    if (!data.amount_to_buy) {
        return res.status(400).send("amount_to_buy parametr is required");
    }
    clientOrdersFunctions.AcceptSellOrder(data.order_id, userId, data.amount_to_buy).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/accept-buy-order", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    if (!data.amount_to_sell) {
        return res.status(400).send("amount_to_sell parametr is required");
    }
    clientOrdersFunctions.AcceptBuyOrder(data.order_id, userId, data.amount_to_sell).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/confirm-exchange", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var user_id = req["token"]["_id"];
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    clientOrdersFunctions.ConfirmExchange(data.order_id, user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/abort-deal", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    clientOrdersFunctions.AbortDeal(data.order_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-order", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    var user_id = req["token"]["_id"];
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    clientOrdersFunctions.GetOrder(id, user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/user-orders", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]["_id"];
    var status = req.query.status;
    if (!status) {
        return res.status(400).send("status parametr is required");
    }
    clientOrdersFunctions.UserOrders(user_id, status).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/report", function (req, res) {
    clientOrdersFunctions.Rates().then(function (doc) {
        return res.type('application/xml').status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=orders.js.map