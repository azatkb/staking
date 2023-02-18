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
var mongoose_1 = __importDefault(require("mongoose"));
var ClientOrder_1 = __importDefault(require("../models/ClientOrder"));
var User_1 = __importDefault(require("../models/User"));
var PartnerOperation_1 = __importDefault(require("../models/PartnerOperation"));
var Chat_1 = __importDefault(require("../models/Chat"));
var ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
var Prop_1 = __importDefault(require("../models/Prop"));
var CashSetting_1 = __importDefault(require("../models/CashSetting"));
var Exchange_1 = __importDefault(require("../models/Exchange"));
var clientPayAccount_1 = require("./clientPayAccount");
var constants_1 = require("../util/constants");
var util_1 = require("../util/util");
var orderLog_1 = require("./orderLog");
var clientPayAccountDb = __importStar(require("./clientPayAccount"));
var systemAccountDb = __importStar(require("./systemAccount"));
var chat_1 = require("./chat");
exports.CreateOrderSell = function (userId, client_pay_id_purse, amount_to_sell, rate, all_amount, for_verified, receive_type, props, cash_props, time_to_live, note) {
    return new Promise(function (resolve, reject) {
        var clientOrder = new ClientOrder_1["default"]({
            order_id: util_1.generateId(10).toUpperCase(),
            client_id_from: new mongoose_1["default"].Types.ObjectId(userId),
            user_id: new mongoose_1["default"].Types.ObjectId(userId),
            auto: false,
            client_pay_id_purse: new mongoose_1["default"].Types.ObjectId(client_pay_id_purse),
            amount_to_sell: amount_to_sell,
            rate: rate,
            all_amount: all_amount,
            for_verified: for_verified,
            receive_type: receive_type,
            order_status: constants_1.OrderStatuses.active,
            type: constants_1.OrderTypes.sell,
            props: props,
            time_to_live: time_to_live,
            cash_props: cash_props,
            note: note
        });
        clientOrder.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.CreateOrderBuy = function (userId, for_verified, time_to_live, note, rate, amount_to_buy, props, cash_props, client_pay_id_purse, receive_type) {
    return new Promise(function (resolve, reject) {
        var clientOrder = new ClientOrder_1["default"]({
            order_id: util_1.generateId(10).toUpperCase(),
            client_id_to: new mongoose_1["default"].Types.ObjectId(userId),
            user_id: new mongoose_1["default"].Types.ObjectId(userId),
            auto: false,
            rate: rate,
            amount_to_buy: amount_to_buy,
            for_verified: for_verified,
            order_status: constants_1.OrderStatuses.active,
            type: constants_1.OrderTypes.buy,
            note: note,
            time_to_live: time_to_live,
            props: props,
            cash_props: cash_props,
            client_pay_id_purse: client_pay_id_purse,
            receive_type: receive_type
        });
        clientOrder.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.SellOrders = function (page, to_buy_currency, to_sell_currency, country, amount_to_sell) {
    if (to_buy_currency === void 0) { to_buy_currency = null; }
    if (to_sell_currency === void 0) { to_sell_currency = null; }
    if (country === void 0) { country = null; }
    if (amount_to_sell === void 0) { amount_to_sell = null; }
    return new Promise(function (resolve, reject) {
        var conditions = {
            type: constants_1.OrderTypes.sell,
            order_status: constants_1.OrderStatuses.active
        };
        if (to_buy_currency) {
            conditions["props"] = { $elemMatch: { currency: to_buy_currency } };
        }
        if (to_sell_currency) {
            conditions["pay_account.payment_system"] = to_sell_currency;
        }
        if (country) {
            conditions["user.country"] = country;
        }
        if (amount_to_sell) {
            conditions["amount_to_sell"] = amount_to_sell;
        }
        ClientOrder_1["default"].aggregate([
            {
                $lookup: {
                    from: "clientpayaccounts",
                    localField: "client_pay_id_purse",
                    foreignField: "_id",
                    as: "pay_account"
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "client_id_from",
                    foreignField: "_id",
                    as: "user"
                }
            }, {
                $lookup: {
                    from: "ratings",
                    localField: "user.rating",
                    foreignField: "_id",
                    as: "rating"
                }
            },
            {
                $match: conditions
            },
            {
                $project: {
                    props: 1,
                    cash_props: 1,
                    receive_type: 1,
                    amount_to_sell: 1,
                    for_verified: 1,
                    rate: 1,
                    user: { "$arrayElemAt": ["$user", 0] },
                    rating: { "$arrayElemAt": ["$rating", 0] },
                    pay_account: { "$arrayElemAt": ["$pay_account", 0] }
                }
            },
            {
                $skip: page * 12
            },
            {
                $limit: 12
            }
        ]).exec(function (err, orders) {
            var prop_ids = [];
            var cash_setting_ids = [];
            orders.forEach(function (order) {
                if (order.props) {
                    order.props.forEach(function (prop) {
                        prop_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
                if (order.cash_props) {
                    order.cash_props.forEach(function (prop) {
                        cash_setting_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
            });
            CashSetting_1["default"].find({ _id: { "$in": cash_setting_ids } })
                .exec(function (err, cashSettingDocs) {
                if (!err) {
                    Prop_1["default"].find({ _id: { "$in": prop_ids } })
                        .populate("prop_type_id")
                        .exec(function (err, propsDocs) {
                        if (!err) {
                            var result_1 = [];
                            orders.forEach(function (order) {
                                var purse = order["pay_account"];
                                var user = order["user"];
                                var rating = order["rating"];
                                var to = [];
                                if (order.receive_type === constants_1.ReceiweTypes.epay) {
                                    if (order.props) {
                                        order.props.forEach(function (prop) {
                                            propsDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._id) {
                                                    var propInfo = propDoc["prop_type_id"];
                                                    to.push({
                                                        name: propInfo.payment_sys_short_name,
                                                        logo: propInfo.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                else if (order.receive_type === constants_1.ReceiweTypes.cash) {
                                    if (order.cash_props) {
                                        order.cash_props.forEach(function (prop) {
                                            cashSettingDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._id) {
                                                    to.push({
                                                        name: propDoc.country + " " + propDoc.city + " " + propDoc.short_cash_cur,
                                                        logo: propDoc.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                var data = {
                                    _id: order._id,
                                    user: {
                                        _id: user._id,
                                        photo: user.photo,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        verif_status: user.verif_status
                                    },
                                    rating: {
                                        total: rating.total,
                                        bad: rating.bad,
                                        good: rating.good,
                                        rating: rating.rating
                                    },
                                    from: {
                                        system: purse["payment_system"],
                                        amount_to_sell: order.amount_to_sell,
                                        rate: order.rate
                                    },
                                    receive_type: order.receive_type,
                                    for_verified: order.for_verified,
                                    to: to
                                };
                                result_1.push(data);
                            });
                            resolve(result_1);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
exports.BuyOrders = function (page, to_buy_currency, to_sell_currency, country, amount_to_buy) {
    if (to_buy_currency === void 0) { to_buy_currency = null; }
    if (to_sell_currency === void 0) { to_sell_currency = null; }
    if (country === void 0) { country = null; }
    if (amount_to_buy === void 0) { amount_to_buy = null; }
    return new Promise(function (resolve, reject) {
        var conditions = {
            type: constants_1.OrderTypes.buy,
            order_status: constants_1.OrderStatuses.active
        };
        if (to_buy_currency) {
            conditions["props"] = { $elemMatch: { currency: to_buy_currency } };
        }
        if (to_sell_currency) {
            conditions["pay_account.payment_system"] = to_sell_currency;
        }
        if (country) {
            conditions["user.country"] = country;
        }
        if (amount_to_buy) {
            conditions["amount_to_buy"] = amount_to_buy;
        }
        ClientOrder_1["default"].aggregate([
            {
                $lookup: {
                    from: "clientpayaccounts",
                    localField: "client_pay_id_purse",
                    foreignField: "_id",
                    as: "pay_account"
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "client_id_to",
                    foreignField: "_id",
                    as: "user"
                }
            }, {
                $lookup: {
                    from: "ratings",
                    localField: "user.rating",
                    foreignField: "_id",
                    as: "rating"
                }
            },
            {
                $match: conditions
            },
            {
                $project: {
                    cash_props: 1,
                    props: 1,
                    receive_type: 1,
                    amount_to_sell: 1,
                    for_verified: 1,
                    rate: 1,
                    user: { "$arrayElemAt": ["$user", 0] },
                    rating: { "$arrayElemAt": ["$rating", 0] },
                    pay_account: { "$arrayElemAt": ["$pay_account", 0] }
                }
            },
            {
                $skip: page * 12
            },
            {
                $limit: 12
            }
        ]).exec(function (err, orders) {
            var prop_ids = [];
            var cash_setting_ids = [];
            orders.forEach(function (order) {
                if (order.props) {
                    order.props.forEach(function (prop) {
                        prop_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
                if (order.cash_props) {
                    order.cash_props.forEach(function (prop) {
                        cash_setting_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
            });
            CashSetting_1["default"].find({ _id: { "$in": cash_setting_ids } })
                .exec(function (err, cashSettingDocs) {
                if (!err) {
                    Prop_1["default"].find({ _id: { "$in": prop_ids } })
                        .populate("prop_type_id")
                        .exec(function (err, propsDocs) {
                        if (!err) {
                            var result_2 = [];
                            orders.forEach(function (order) {
                                var purse = order["pay_account"];
                                var user = order["user"];
                                var rating = order["rating"];
                                var to = [];
                                if (order.receive_type === constants_1.ReceiweTypes.epay) {
                                    if (order.props) {
                                        order.props.forEach(function (prop) {
                                            propsDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._id) {
                                                    var propInfo = propDoc["prop_type_id"];
                                                    to.push({
                                                        name: propInfo.payment_sys_short_name,
                                                        logo: propInfo.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                else if (order.receive_type === constants_1.ReceiweTypes.cash) {
                                    if (order.cash_props) {
                                        order.cash_props.forEach(function (prop) {
                                            cashSettingDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._ids) {
                                                    to.push({
                                                        name: propDoc.country + " " + propDoc.city + " " + propDoc.short_cash_cur,
                                                        logo: propDoc.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                var data = {
                                    _id: order._id,
                                    user: {
                                        _id: user._id,
                                        photo: user.photo,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        verif_status: user.verif_status
                                    },
                                    rating: {
                                        total: rating.total,
                                        bad: rating.bad,
                                        good: rating.good,
                                        rating: rating.rating
                                    },
                                    from: {
                                        system: purse["payment_system"],
                                        amount_to_sell: order.amount_to_sell,
                                        rate: order.rate
                                    },
                                    receive_type: order.receive_type,
                                    for_verified: order.for_verified,
                                    to: to
                                };
                                result_2.push(data);
                            });
                            resolve(result_2);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
exports.Orders = function (page) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        ClientOrder_1["default"].aggregate([
            {
                $lookup: {
                    from: "clientpayaccounts",
                    localField: "client_pay_id_purse",
                    foreignField: "_id",
                    as: "pay_account"
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "client_id_to",
                    foreignField: "_id",
                    as: "buyer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "client_id_from",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $match: conditions
            },
            {
                $project: {
                    props: 1,
                    cash_props: 1,
                    receive_type: 1,
                    amount_to_sell: 1,
                    for_verified: 1,
                    rate: 1,
                    buyer: { "$arrayElemAt": ["$buyer", 0] },
                    seller: { "$arrayElemAt": ["$seller", 0] },
                    rating: { "$arrayElemAt": ["$rating", 0] },
                    pay_account: { "$arrayElemAt": ["$pay_account", 0] }
                }
            },
            {
                $skip: page * 12
            },
            {
                $limit: 12
            }
        ]).exec(function (err, orders) {
            var result = [];
            orders.forEach(function (order) {
                var purse = order["pay_account"];
                var buyer = order["buyer"];
                var seller = order["seller"];
                var data = {
                    _id: order._id,
                    type: order.type,
                    buyer: buyer ? {
                        _id: buyer._id,
                        photo: buyer.photo,
                        email: buyer.email,
                        firstname: buyer.firstname,
                        lastname: buyer.lastname,
                        verif_status: buyer.verif_status
                    } : null,
                    seller: seller ? {
                        _id: seller._id,
                        photo: seller.photo,
                        email: seller.email,
                        firstname: seller.firstname,
                        lastname: seller.lastname,
                        verif_status: seller.verif_status
                    } : null,
                    from: {
                        system: purse["payment_system"],
                        amount_to_sell: order.amount_to_sell,
                        rate: order.rate
                    },
                    receive_type: order.receive_type,
                    for_verified: order.for_verified
                };
                result.push(data);
            });
            resolve(result);
        });
    });
};
exports.AcceptBuyOrder = function (order_id, client_id_from, amount_to_sell) {
    return new Promise(function (resolve, reject) {
        ClientOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(order_id) })
            .populate("client_pay_id_purse")
            .exec(function (err, clientOrder) {
            if (!err) {
                /// Check seller purse
                clientPayAccount_1.GetPurseByCurrency(client_id_from, clientOrder["client_pay_id_purse"]["payment_system"]).then(function (sellerPayAccount) {
                    if (sellerPayAccount.cap_balance < amount_to_sell) {
                        reject({ code: 400, msg: "not enough balance" });
                    }
                    ClientOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(order_id) }, { $set: {
                            client_id_from: new mongoose_1["default"].Types.ObjectId(client_id_from),
                            amount_to_sell: amount_to_sell,
                            order_status: amount_to_sell < clientOrder.amount_to_buy ? constants_1.OrderStatuses.part_accepted : constants_1.OrderStatuses.full_accepted
                        } }, function (err, saved) {
                        if (!err) {
                            orderLog_1.CreateLog(order_id, amount_to_sell < clientOrder.amount_to_buy ? constants_1.OrderStatuses.part_accepted : constants_1.OrderStatuses.full_accepted).then(function () {
                                new Exchange_1["default"]({
                                    from_purse: sellerPayAccount["client_account_purse"],
                                    to_purse: clientOrder["client_pay_id_purse"]["client_account_purse"],
                                    amount: amount_to_sell,
                                    status: constants_1.ExchangeStatuses.waiting,
                                    order_id: order_id
                                }).save(function (err, saved) {
                                    if (!err) {
                                        var chat = new Chat_1["default"]({
                                            client_id_from: client_id_from,
                                            client_id_to: clientOrder.client_id_to._id,
                                            order_id: order_id,
                                            type: constants_1.ChatTypes.order,
                                            open: true
                                        });
                                        chat.save(function (err, doc) {
                                            if (!err) {
                                                resolve({ chat_id: doc._id });
                                            }
                                            else {
                                                reject(err);
                                            }
                                        });
                                    }
                                    else {
                                        reject(err);
                                    }
                                });
                            })["catch"](function (err) {
                                reject(err);
                            });
                        }
                        else {
                            reject(err);
                        }
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.AcceptSellOrder = function (orderId, client_id_to, amount_to_buy) {
    return new Promise(function (resolve, reject) {
        /// Get order info
        ClientOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(orderId) })
            .populate("client_id_from")
            .populate("client_pay_id_purse")
            .exec(function (err, clientOrder) {
            if ((clientOrder.all_amount) && (amount_to_buy < clientOrder.amount_to_sell)) {
                reject({ code: 400, msg: "not enough amount" });
            }
            else {
                /// Check buyer purse
                clientPayAccount_1.GetPurseByCurrency(client_id_to, clientOrder["client_pay_id_purse"]["payment_system"]).then(function (buyerPayAccount) {
                    ClientOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(orderId) }, { $set: {
                            client_id_to: new mongoose_1["default"].Types.ObjectId(client_id_to),
                            amount_to_buy: amount_to_buy,
                            order_status: amount_to_buy < clientOrder.amount_to_sell ? constants_1.OrderStatuses.part_accepted : constants_1.OrderStatuses.full_accepted
                        } }, function (err, saved) {
                        if (!err) {
                            /// Log changes
                            orderLog_1.CreateLog(orderId, amount_to_buy < clientOrder.amount_to_sell ? constants_1.OrderStatuses.part_accepted : constants_1.OrderStatuses.full_accepted).then(function () {
                                /// Create exchange entity
                                new Exchange_1["default"]({
                                    from_purse: clientOrder["client_pay_id_purse"]["client_account_purse"],
                                    to_purse: buyerPayAccount["client_account_purse"],
                                    amount: amount_to_buy,
                                    status: constants_1.ExchangeStatuses.waiting,
                                    order_id: orderId
                                }).save(function (err, saved) {
                                    if (!err) {
                                        var seller_1 = clientOrder["client_id_from"];
                                        var chat = new Chat_1["default"]({
                                            client_id_from: clientOrder.client_id_from,
                                            client_id_to: clientOrder.client_id_to,
                                            order_id: clientOrder._id,
                                            type: constants_1.ChatTypes.order,
                                            open: true
                                        });
                                        chat.save(function (err, doc) {
                                            if (!err) {
                                                if (clientOrder.props && clientOrder.props.length && seller_1.show_requisites) {
                                                    var main_props = clientOrder.props[0];
                                                    Prop_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(main_props["_id"]) })
                                                        .populate("prop_type_id")
                                                        .exec(function (err, prop) {
                                                        var text = "\u0417\u0434\u0440\u0430\u0432\u0441\u0432\u0443\u0439\u0442\u0435. \n        \n                                                        \u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 " + clientOrder.amount_to_sell * clientOrder.rate + " " + prop.currency_prop + " \u041D\u0430 \u0440\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B: \n                                                        -----------------------------\n                                                        " + prop.prop_num + " " + prop["prop_type_id"]["payment_system_prop"] + "\n                                                        -----------------------------\n                                                        ";
                                                        var message = new ChatMessage_1["default"]({
                                                            chat_id: doc._id,
                                                            user_id: clientOrder.client_id_from,
                                                            text: text,
                                                            type: constants_1.MessageTypes.requisite
                                                        });
                                                        message.save(function (err, savedMessage) {
                                                            if (!err) {
                                                                resolve({ chat_id: doc._id });
                                                            }
                                                            else {
                                                                reject(err);
                                                            }
                                                        });
                                                    });
                                                }
                                                else {
                                                    resolve({ chat_id: doc._id });
                                                }
                                            }
                                            else {
                                                reject(err);
                                            }
                                        });
                                    }
                                    else {
                                        reject(err);
                                    }
                                });
                            })["catch"](function (err) {
                                reject(err);
                            });
                        }
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
        });
    });
};
exports.GetOrder = function (_id, user_id) {
    return new Promise(function (resolve, reject) {
        ClientOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) })
            .populate("client_id_to")
            .populate("client_id_from")
            .populate("client_pay_id_purse")
            .exec(function (err, order) {
            if (!err) {
                if (order) {
                    var prop_ids_1 = [];
                    var cash_setting_ids_1 = [];
                    if (order.props) {
                        order.props.forEach(function (prop) {
                            prop_ids_1.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                        });
                    }
                    if (order.cash_props) {
                        order.cash_props.forEach(function (prop) {
                            cash_setting_ids_1.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                        });
                    }
                    CashSetting_1["default"].find({ _id: { "$in": cash_setting_ids_1 } })
                        .exec(function (err, cashSettingDocs) {
                        if (!err) {
                            Prop_1["default"].find({ _id: { "$in": prop_ids_1 } })
                                .populate("prop_type_id")
                                .exec(function (err, propsDocs) {
                                if (!err) {
                                    var to_1 = [];
                                    if (order.receive_type === constants_1.ReceiweTypes.epay) {
                                        if (order.props) {
                                            order.props.forEach(function (prop) {
                                                propsDocs.forEach(function (propDoc) {
                                                    if (propDoc._id.toString() === prop._id) {
                                                        var propInfo = propDoc["prop_type_id"];
                                                        to_1.push({
                                                            name: propInfo.payment_sys_short_name,
                                                            logo: propInfo.logo
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    else if (order.receive_type === constants_1.ReceiweTypes.cash) {
                                        if (order.cash_props) {
                                            order.cash_props.forEach(function (prop) {
                                                cashSettingDocs.forEach(function (propDoc) {
                                                    if (propDoc._id.toString() === prop._id) {
                                                        to_1.push({
                                                            name: propDoc.country + " " + propDoc.city + " " + propDoc.short_cash_cur,
                                                            logo: propDoc.logo
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    var can_close = void 0;
                                    var can_exchange = void 0;
                                    if (order.type == constants_1.OrderTypes.sell) {
                                        if (order["client_id_from"]["_id"].toString() == user_id) {
                                            can_close = order.order_status == constants_1.OrderStatuses.active ? true : false;
                                            can_exchange = ((order.order_status == constants_1.OrderStatuses.part_accepted) || (order.order_status == constants_1.OrderStatuses.full_accepted)) ? true : false;
                                        }
                                        else {
                                            can_close = false;
                                            can_exchange = false;
                                        }
                                    }
                                    else if (order.type == constants_1.OrderTypes.buy) {
                                        if (order["client_id_to"]["_id"].toString() == user_id) {
                                            can_close = order.order_status == constants_1.OrderStatuses.active ? true : false;
                                            can_exchange = false;
                                        }
                                        else {
                                            can_close = false;
                                            can_exchange = ((order.order_status == constants_1.OrderStatuses.part_accepted) || (order.order_status == constants_1.OrderStatuses.full_accepted)) ? true : false;
                                        }
                                    }
                                    var user = order.type == constants_1.OrderTypes.sell ? order["client_id_to"] : order["client_id_from"];
                                    var response = {
                                        _id: order._id,
                                        order_id: order.order_id,
                                        purse: order.client_pay_id_purse,
                                        rate: order.rate,
                                        amount_to_sell: order.amount_to_sell,
                                        order_status: order.order_status,
                                        receive_type: order.receive_type,
                                        to: to_1,
                                        type: order.type,
                                        can_close: can_close,
                                        can_exchange: can_exchange,
                                        user: user ? {
                                            _id: user._id,
                                            verif_status: user.verif_status,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                            photo: user.photo
                                        } : null
                                    };
                                    resolve(response);
                                }
                                else {
                                    reject(err);
                                }
                            });
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject({ code: 404, msg: "not found " });
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.UserOrders = function (user_id, status) {
    return new Promise(function (resolve, reject) {
        var match = {};
        if (status === constants_1.OrderStatuses.active) {
            match = { order_status: constants_1.OrderStatuses.active, user_id: new mongoose_1["default"].Types.ObjectId(user_id) };
        }
        else if (status === constants_1.OrderStatuses.closed) {
            match = { order_status: constants_1.OrderStatuses.closed, user_id: new mongoose_1["default"].Types.ObjectId(user_id) };
        }
        else if (status === constants_1.OrderStatuses.accepted) {
            match = { $or: [{ order_status: constants_1.OrderStatuses.part_accepted, user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, { order_status: constants_1.OrderStatuses.full_accepted, user_id: new mongoose_1["default"].Types.ObjectId(user_id) }] };
        }
        ClientOrder_1["default"].aggregate([
            {
                $lookup: {
                    from: "clientpayaccounts",
                    localField: "client_pay_id_purse",
                    foreignField: "_id",
                    as: "pay_account"
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "client_id_to",
                    foreignField: "_id",
                    as: "buyer"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "client_id_from",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $lookup: {
                    from: "ratings",
                    localField: "seller.rating",
                    foreignField: "_id",
                    as: "seller_rating"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "client_id_to",
                    foreignField: "_id",
                    as: "buyer"
                }
            },
            {
                $lookup: {
                    from: "ratings",
                    localField: "buyer.rating",
                    foreignField: "_id",
                    as: "buyer_rating"
                }
            },
            {
                $match: match
            },
            {
                $project: {
                    order_status: 1,
                    type: 1,
                    props: 1,
                    cash_props: 1,
                    receive_type: 1,
                    amount_to_sell: 1,
                    for_verified: 1,
                    rate: 1,
                    seller: { "$arrayElemAt": ["$seller", 0] },
                    seller_rating: { "$arrayElemAt": ["$seller_rating", 0] },
                    buyer: { "$arrayElemAt": ["$buyer", 0] },
                    buyer_rating: { "$arrayElemAt": ["$buyer_rating", 0] },
                    pay_account: { "$arrayElemAt": ["$pay_account", 0] }
                }
            }
        ]).exec(function (err, orders) {
            var prop_ids = [];
            var cash_setting_ids = [];
            orders.forEach(function (order) {
                if (order.props) {
                    order.props.forEach(function (prop) {
                        prop_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
                if (order.cash_props) {
                    order.cash_props.forEach(function (prop) {
                        cash_setting_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                    });
                }
            });
            CashSetting_1["default"].find({ _id: { "$in": cash_setting_ids } })
                .exec(function (err, cashSettingDocs) {
                if (!err) {
                    Prop_1["default"].find({ _id: { "$in": prop_ids } })
                        .populate("prop_type_id")
                        .exec(function (err, propsDocs) {
                        if (!err) {
                            var result_3 = [];
                            orders.forEach(function (order) {
                                var purse = order["pay_account"];
                                var user = order.type == constants_1.OrderTypes.sell ? order["buyer"] : order["seller"];
                                var rating = order.type == constants_1.OrderTypes.sell ? order["buyer_rating"] : order["seller_rating"];
                                var to = [];
                                if (order.receive_type === constants_1.ReceiweTypes.epay) {
                                    if (order.props) {
                                        order.props.forEach(function (prop) {
                                            propsDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._id) {
                                                    var propInfo = propDoc["prop_type_id"];
                                                    to.push({
                                                        name: propInfo.payment_sys_short_name,
                                                        logo: propInfo.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                else if (order.receive_type === constants_1.ReceiweTypes.cash) {
                                    if (order.cash_props) {
                                        order.cash_props.forEach(function (prop) {
                                            cashSettingDocs.forEach(function (propDoc) {
                                                if (propDoc._id.toString() === prop._id) {
                                                    to.push({
                                                        name: propDoc.country + " " + propDoc.city + " " + propDoc.short_cash_cur,
                                                        logo: propDoc.logo
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                                var data = {
                                    _id: order._id,
                                    type: order.type,
                                    order_status: order.order_status,
                                    from: purse ? {
                                        system: purse["payment_system"],
                                        amount_to_sell: order.amount_to_sell,
                                        rate: order.rate
                                    } : null,
                                    receive_type: order.receive_type,
                                    for_verified: order.for_verified,
                                    to: to,
                                    user: user ? {
                                        _id: user._id,
                                        verif_status: user.verif_status,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        photo: user.photo
                                    } : null,
                                    rating: rating ? {
                                        total: rating.total,
                                        bad: rating.bad,
                                        good: rating.good,
                                        rating: rating.rating
                                    } : null
                                };
                                result_3.push(data);
                            });
                            resolve(result_3);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
var ReferalCommission = function (client_id_from, payment_system, amount) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(client_id_from) }, function (err, user) {
            if (!err) {
                if (user.referal) {
                    User_1["default"].findOne({ partner_key: user.referal }, function (err, partner) {
                        if (err) {
                            reject(err);
                        }
                        else if (partner) {
                            clientPayAccountDb.GetPurseByCurrency(partner._id.toHexString(), payment_system).then(function (partner_purse) {
                                var partner_profit = util_1.percentage(1, amount);
                                var amount_to_user = amount - partner_profit;
                                new PartnerOperation_1["default"]({
                                    user_id: partner._id,
                                    client_pay_id: partner_purse._id,
                                    amount: partner_profit
                                }).save(function (err, partner_operation) {
                                    if (!err) {
                                        clientPayAccountDb.Transaction(partner_purse["client_account_purse"], partner_purse["payment_system"], partner_profit, constants_1.ClientOperationTypes.pp, null, partner_operation._id, null).then(function (res) {
                                            resolve(amount_to_user);
                                        })["catch"](function (err) {
                                            reject(err);
                                        });
                                    }
                                    else {
                                        reject(err);
                                    }
                                });
                            })["catch"](function (err) {
                                reject(err);
                            });
                        }
                        else {
                            resolve(amount);
                        }
                    });
                }
                else {
                    resolve(amount);
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.ConfirmExchange = function (_id, user_id) {
    return new Promise(function (resolve, reject) {
        /// Find order
        ClientOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) })
            .populate("client_pay_id_purse")
            .exec(function (err, order) {
            if (!err) {
                if (order) {
                    if (order.client_id_from.toHexString() == user_id) {
                        if ((order.order_status == constants_1.OrderStatuses.part_accepted) || (order.order_status == constants_1.OrderStatuses.full_accepted)) {
                            /// Find exchange object
                            Exchange_1["default"].findOne({ order_id: new mongoose_1["default"].Types.ObjectId(_id) })
                                .exec(function (err, exchange) {
                                if (!err) {
                                    if (exchange) {
                                        if (order.type == constants_1.OrderTypes.sell) {
                                            var seller_purse_1 = order["client_pay_id_purse"];
                                            var amount_1 = order.amount_to_buy;
                                            /// Get buyer purse
                                            clientPayAccountDb.GetPurseByCurrency(order["client_id_to"].toHexString(), seller_purse_1["payment_system"]).then(function (buyer_purse) {
                                                /// Write seller balance change
                                                clientPayAccountDb.Transaction(seller_purse_1["client_account_purse"], seller_purse_1["payment_system"], -amount_1, constants_1.ClientOperationTypes.order, order._id).then(function (res) {
                                                    /// Check Referal 
                                                    ReferalCommission(seller_purse_1["user_id"], seller_purse_1["payment_system"], amount_1).then(function (amount_to_buyer) {
                                                        /// Write buyer balance change
                                                        clientPayAccountDb.Transaction(buyer_purse["client_account_purse"], buyer_purse["payment_system"], amount_to_buyer, constants_1.ClientOperationTypes.order, order._id).then(function (res) {
                                                            /// Change order status
                                                            ClientOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { order_status: order.order_status == constants_1.OrderStatuses.full_accepted ? constants_1.OrderStatuses.full_paid : constants_1.OrderStatuses.part_paid } })
                                                                .exec(function (err, saved) {
                                                                if (!err) {
                                                                    /// Log changes
                                                                    orderLog_1.CreateLog(_id, order.order_status == constants_1.OrderStatuses.full_accepted ? constants_1.OrderStatuses.full_paid : constants_1.OrderStatuses.part_paid).then(function () {
                                                                        Exchange_1["default"].updateOne({ order_id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { status: constants_1.ExchangeStatuses.completed } }, function (err, doc) {
                                                                            if (!err) {
                                                                                resolve({ code: 200, msg: "succes" });
                                                                            }
                                                                            else {
                                                                                reject(err);
                                                                            }
                                                                        });
                                                                    })["catch"](function (err) {
                                                                        reject(err);
                                                                    });
                                                                }
                                                                else {
                                                                    reject(err);
                                                                }
                                                            });
                                                        })["catch"](function (err) {
                                                            reject(err);
                                                        });
                                                    })["catch"](function (err) {
                                                        reject(err);
                                                    });
                                                })["catch"](function (err) {
                                                    reject(err);
                                                });
                                            })["catch"](function (err) {
                                                reject(err);
                                            });
                                        }
                                        else {
                                            var buyer_purse_1 = order["client_pay_id_purse"];
                                            var amount_2 = order.amount_to_sell;
                                            clientPayAccountDb.GetPurseByCurrency(order["client_id_from"].toHexString(), buyer_purse_1["payment_system"]).then(function (seller_purse) {
                                                /// Write seller balance change
                                                clientPayAccountDb.Transaction(seller_purse["client_account_purse"], seller_purse["payment_system"], -amount_2, constants_1.ClientOperationTypes.order, order._id).then(function (res) {
                                                    /// Check Referal 
                                                    ReferalCommission(seller_purse["user_id"], seller_purse["payment_system"], amount_2).then(function (amount_to_buyer) {
                                                        /// Write buyer balance change
                                                        clientPayAccountDb.Transaction(buyer_purse_1["client_account_purse"], buyer_purse_1["payment_system"], amount_to_buyer, constants_1.ClientOperationTypes.order, order._id).then(function (res) {
                                                            ClientOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { order_status: order.order_status == constants_1.OrderStatuses.full_accepted ? constants_1.OrderStatuses.full_paid : constants_1.OrderStatuses.part_paid } })
                                                                .exec(function (err, saved) {
                                                                if (!err) {
                                                                    /// Log changes
                                                                    orderLog_1.CreateLog(_id, order.order_status == constants_1.OrderStatuses.full_accepted ? constants_1.OrderStatuses.full_paid : constants_1.OrderStatuses.part_paid).then(function () {
                                                                        Exchange_1["default"].updateOne({ order_id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { status: constants_1.ExchangeStatuses.completed } }, function (err, doc) {
                                                                            if (!err) {
                                                                                resolve({ code: 200, msg: "succes" });
                                                                            }
                                                                            else {
                                                                                reject(err);
                                                                            }
                                                                        });
                                                                    })["catch"](function (err) {
                                                                        reject(err);
                                                                    });
                                                                }
                                                                else {
                                                                    reject(err);
                                                                }
                                                            });
                                                        })["catch"](function (err) {
                                                            reject(err);
                                                        });
                                                    })["catch"](function (err) {
                                                        reject(err);
                                                    });
                                                })["catch"](function (err) {
                                                    reject(err);
                                                });
                                            })["catch"](function (err) {
                                                reject(err);
                                            });
                                        }
                                    }
                                    else {
                                        reject({ code: 404, msg: "exchange not found" });
                                    }
                                }
                                else {
                                    reject(err);
                                }
                            });
                        }
                        else {
                            reject({ code: 400, msg: "order status not valid" });
                        }
                    }
                    else {
                        reject({ code: 400, msg: "permission denied to exchange" });
                    }
                }
                else {
                    reject({ code: 404, msg: "order not found" });
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.AbortDeal = function (_id) {
    return new Promise(function (resolve, reject) {
        ClientOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, order) {
            if (!err) {
                if (order) {
                    if ((order.order_status == constants_1.OrderStatuses.full_accepted) || (order.order_status == constants_1.OrderStatuses.part_accepted)) {
                        ClientOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                                order_status: constants_1.OrderStatuses.active,
                                client_id_to: null,
                                amount_to_buy: null
                            } }, function (err, updated) {
                            if (!err) {
                                chat_1.DeleteOrderChat(_id).then(function () {
                                    orderLog_1.CreateLog(_id, constants_1.OrderStatuses.abort_deal).then(function () {
                                        resolve({ code: 200, msg: "success" });
                                    })["catch"](function (err) {
                                        reject(err);
                                    });
                                })["catch"](function (err) {
                                    reject(err);
                                });
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                    else {
                        reject({ code: 400, msg: "order can cancel by seller" });
                    }
                }
                else {
                    reject({ code: 404, msg: "order not found" });
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.Rates = function () {
    return new Promise(function (resolve, reject) {
        systemAccountDb.List().then(function (systemAccounts) {
            var withdraw_fees = {};
            systemAccounts.forEach(function (systemAccount) {
                withdraw_fees[systemAccount["short_name"]] = systemAccount.service_comission_out;
            });
            var match = { order_status: constants_1.OrderStatuses.active };
            ClientOrder_1["default"].aggregate([
                {
                    $lookup: {
                        from: "clientpayaccounts",
                        localField: "client_pay_id_purse",
                        foreignField: "_id",
                        as: "pay_account"
                    }
                }, {
                    $lookup: {
                        from: "users",
                        localField: "client_id_to",
                        foreignField: "_id",
                        as: "buyer"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "client_id_from",
                        foreignField: "_id",
                        as: "seller"
                    }
                },
                {
                    $lookup: {
                        from: "ratings",
                        localField: "seller.rating",
                        foreignField: "_id",
                        as: "seller_rating"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "client_id_to",
                        foreignField: "_id",
                        as: "buyer"
                    }
                },
                {
                    $lookup: {
                        from: "ratings",
                        localField: "buyer.rating",
                        foreignField: "_id",
                        as: "buyer_rating"
                    }
                },
                {
                    $match: match
                },
                {
                    $project: {
                        props: 1,
                        cash_props: 1,
                        receive_type: 1,
                        amount_to_sell: 1,
                        for_verified: 1,
                        rate: 1,
                        pay_account: { "$arrayElemAt": ["$pay_account", 0] }
                    }
                }
            ]).exec(function (err, orders) {
                var prop_ids = [];
                var cash_setting_ids = [];
                orders.forEach(function (order) {
                    if (order.props) {
                        order.props.forEach(function (prop) {
                            prop_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                        });
                    }
                    if (order.cash_props) {
                        order.cash_props.forEach(function (prop) {
                            cash_setting_ids.push(new mongoose_1["default"].Types.ObjectId(prop._id));
                        });
                    }
                });
                CashSetting_1["default"].find({ _id: { "$in": cash_setting_ids } })
                    .exec(function (err, cashSettingDocs) {
                    if (!err) {
                        Prop_1["default"].find({ _id: { "$in": prop_ids } })
                            .populate("prop_type_id")
                            .exec(function (err, propsDocs) {
                            if (!err) {
                                var result_4 = [];
                                orders.forEach(function (order) {
                                    var purse = order["pay_account"];
                                    var to = [];
                                    if (order.receive_type === constants_1.ReceiweTypes.epay) {
                                        if (order.props) {
                                            order.props.forEach(function (prop) {
                                                propsDocs.forEach(function (propDoc) {
                                                    if (propDoc._id.toString() === prop._id) {
                                                        var propInfo = propDoc["prop_type_id"];
                                                        to.push({
                                                            name: propInfo.payment_sys_short_name,
                                                            cur_estandart: propInfo.estandart,
                                                            type: "epay"
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    else if (order.receive_type === constants_1.ReceiweTypes.cash) {
                                        if (order.cash_props) {
                                            order.cash_props.forEach(function (prop) {
                                                cashSettingDocs.forEach(function (propDoc) {
                                                    if (propDoc._id.toString() === prop._id) {
                                                        to.push({
                                                            city_estandart: propDoc.city_estandart,
                                                            cur_estandart: propDoc.cur_estandart,
                                                            name: propDoc.city_estandart + propDoc.cur_estandart,
                                                            type: "cash"
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    var data = {
                                        _id: order._id,
                                        type: order.type,
                                        system: purse["payment_system"],
                                        amount_to_sell: order.amount_to_sell,
                                        rate: order.rate,
                                        for_verified: order.for_verified,
                                        to: to
                                    };
                                    result_4.push(data);
                                });
                                var data_1 = {};
                                result_4.forEach(function (order) {
                                    var course = order.amount_to_sell / order.rate;
                                    order.to.forEach(function (to) {
                                        var direction = order.system + to.name;
                                        if (!data_1[direction]) {
                                            if (to.type == "epay") {
                                                data_1[direction] = {
                                                    course: course,
                                                    to: order.system,
                                                    from: to.name,
                                                    amount: order.amount_to_sell,
                                                    tofee: withdraw_fees[order.system] + "%",
                                                    rate: order.rate,
                                                    type: order.type,
                                                    verifying: order.for_verified
                                                };
                                            }
                                            else {
                                                data_1[direction] = {
                                                    course: course,
                                                    to: order.system,
                                                    from: to.cur_estandart,
                                                    city: to.city_estandart,
                                                    amount: order.amount_to_sell,
                                                    tofee: withdraw_fees[order.system] + "%",
                                                    rate: order.rate,
                                                    type: order.type,
                                                    verifying: order.for_verified
                                                };
                                            }
                                        }
                                        else if (course < data_1[direction]["course"]) {
                                            data_1[direction]["course"] = course;
                                        }
                                    });
                                });
                                var response = Object.keys(data_1).map(function (key) {
                                    return data_1[key];
                                });
                                resolve(response);
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    });
};
//# sourceMappingURL=clientOrders.js.map