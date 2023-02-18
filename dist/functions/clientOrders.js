"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var clientOrdersDb = __importStar(require("../database/clientOrders"));
var globalSettingsDb = __importStar(require("../database/globalSettings"));
var clientPayAccountDb = __importStar(require("../database/clientPayAccount"));
var constants_1 = require("../util/constants");
exports.CreateOrderSell = function (userId, client_pay_id_purse, amount_to_sell, rate, all_amount, for_verified, receive_type, props, cash_props, time_to_live, note) {
    return new Promise(function (resolve, reject) {
        // Get available balance
        clientPayAccountDb.GetAwailableBalance(client_pay_id_purse).then(function (availableBalance) {
            if (amount_to_sell <= availableBalance) {
                // Get global site settings
                globalSettingsDb.GetGlobalSettings().then(function (globalSettings) {
                    if (!time_to_live) {
                        var today = new Date();
                        today.setDate(today.getDate() + globalSettings.order_life_time);
                        time_to_live = today;
                    }
                    clientOrdersDb.CreateOrderSell(userId, client_pay_id_purse, amount_to_sell, rate, all_amount, for_verified, receive_type, props, cash_props, time_to_live, note).then(function (res) {
                        resolve(res);
                    })["catch"](function (err) {
                        reject(err);
                    });
                });
            }
            else {
                reject({ code: 400, msg: "Not enough balance" });
            }
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CreateOrderBuy = function (userId, for_verified, time_to_live, note, rate, amount_to_buy, props, cash_props, client_pay_id_purse, receive_type) {
    return new Promise(function (resolve, reject) {
        globalSettingsDb.GetGlobalSettings().then(function (globalSettings) {
            if (!time_to_live) {
                var today = new Date();
                today.setDate(today.getDate() + globalSettings.order_life_time);
                time_to_live = today;
            }
            clientOrdersDb.CreateOrderBuy(userId, for_verified, time_to_live, note, rate, amount_to_buy, props, cash_props, client_pay_id_purse, receive_type).then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                reject(err);
            });
        });
    });
};
exports.SellOrders = function (page, to_buy_currency, to_sell_currency, country, amount_to_sell) {
    if (to_buy_currency === void 0) { to_buy_currency = null; }
    if (to_sell_currency === void 0) { to_sell_currency = null; }
    if (country === void 0) { country = null; }
    if (amount_to_sell === void 0) { amount_to_sell = null; }
    return new Promise(function (resolve, reject) {
        clientOrdersDb.SellOrders(page, to_buy_currency, to_sell_currency, country, amount_to_sell).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.BuyOrders = function (page, to_buy_currency, to_sell_currency, country, amount_to_buy) {
    if (to_buy_currency === void 0) { to_buy_currency = null; }
    if (to_sell_currency === void 0) { to_sell_currency = null; }
    if (country === void 0) { country = null; }
    if (amount_to_buy === void 0) { amount_to_buy = null; }
    return new Promise(function (resolve, reject) {
        clientOrdersDb.BuyOrders(page, to_buy_currency, to_sell_currency, country, amount_to_buy).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Orders = function (page) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.Orders(page).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AcceptSellOrder = function (orderId, userId, amount_to_buy) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.AcceptSellOrder(orderId, userId, amount_to_buy).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AcceptBuyOrder = function (order_id, client_id_from, amount_to_sell) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.AcceptBuyOrder(order_id, client_id_from, amount_to_sell).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UserOrders = function (user_id, status) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.UserOrders(user_id, status).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetOrder = function (order_id, user_id) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.GetOrder(order_id, user_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ConfirmExchange = function (_id, user_id) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.ConfirmExchange(_id, user_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AbortDeal = function (_id) {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.AbortDeal(_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Rates = function () {
    return new Promise(function (resolve, reject) {
        clientOrdersDb.Rates().then(function (data) {
            var xml = ' <?xml version="1.0"?> ' +
                '<rates>';
            data.forEach(function (course) {
                var item = "\n                <item>\n                    <from>" + course.from + "</from>\n                    <to>" + course.to + "</to>\n                    <out>1</out>\n                    <in>" + course.rate + "</in>\n                    <tofee>" + course.tofee + "</tofee>\n                    <amount>" + course.amount + "</amount> \n                    " + (course.city ? "<city>" + course.city + "</city>" : "") + "\n                    <param> " + (course.type !== constants_1.OrderTypes.auto ? "manual" : "auto") + " " + (course.verifying ? ", verifying" : "") + " </param>\n                </item>\n                ";
                xml += item;
            });
            xml += '</rates>';
            resolve(xml);
        });
    });
};
//# sourceMappingURL=clientOrders.js.map