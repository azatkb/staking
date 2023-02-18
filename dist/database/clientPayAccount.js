"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ClientPayAccount_1 = __importDefault(require("../models/ClientPayAccount"));
var ClientOperation_1 = __importDefault(require("../models/ClientOperation"));
var ClientOrder_1 = __importDefault(require("../models/ClientOrder"));
var WestWalletLog_1 = __importDefault(require("../models/WestWalletLog"));
var WithdrawOrder_1 = __importDefault(require("../models/WithdrawOrder"));
var User_1 = __importDefault(require("../models/User"));
var constants_1 = require("../util/constants");
exports.IsOwnAddress = function (address) {
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].find({ client_account_purse: address }, function (err, docs) {
            if (!err) {
                if (docs.length) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.CreateWestWalletLog = function (pay_account_id, log) {
    return new Promise(function (resolve, reject) {
        new WestWalletLog_1["default"]({
            pay_account_id: new mongoose_1["default"].Types.ObjectId(pay_account_id),
            log: log
        }).save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.CreatePayAccount = function (userId, client_account_purse, payment_system) {
    return new Promise(function (resolve, reject) {
        var clientPayAccount = new ClientPayAccount_1["default"]({
            user_id: new mongoose_1["default"].Types.ObjectId(userId),
            status_account_purse: constants_1.ClientPayAccountStatuses.active,
            payment_system: payment_system,
            client_account_purse: client_account_purse,
            cap_balance: 0
        });
        clientPayAccount.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetUserClientPayAccount = function (userId, payment_system) {
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].findOne({ user_id: new mongoose_1["default"].Types.ObjectId(userId), payment_system: payment_system }, function (err, doc) {
            if (!err) {
                if (doc) {
                    resolve(doc);
                }
                else {
                    reject({ code: 404, msg: "purse not found" });
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.Transaction = function (client_account_purse, payment_system, amount, type, order_id, pp_id, withdraw_id) {
    if (type === void 0) { type = null; }
    if (order_id === void 0) { order_id = null; }
    if (pp_id === void 0) { pp_id = null; }
    if (withdraw_id === void 0) { withdraw_id = null; }
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].findOne({ client_account_purse: client_account_purse, payment_system: payment_system }, function (err, clientPayAccount) {
            if (!err) {
                var balance_before = clientPayAccount.cap_balance;
                var balance_after_1 = clientPayAccount.cap_balance + amount;
                var clientOperation = new ClientOperation_1["default"]({
                    user_id: clientPayAccount.user_id,
                    client_pay_id: clientPayAccount._id,
                    type: type,
                    balance_before: balance_before,
                    balance_after: balance_after_1,
                    order_id: order_id,
                    pp_id: pp_id,
                    withdraw_id: withdraw_id
                });
                clientOperation.save(function (err, doc) {
                    if (!err) {
                        ClientPayAccount_1["default"].updateOne({ _id: clientPayAccount._id }, { $set: { cap_balance: balance_after_1 } }, function (err, saved) {
                            if (!err) {
                                resolve({ code: 200 });
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
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetBusyBalance = function (pay_account) {
    return new Promise(function (resolve, reject) {
        ClientOrder_1["default"].find({ client_pay_id_purse: new mongoose_1["default"].Types.ObjectId(pay_account._id), order_status: { "$in": [constants_1.OrderStatuses.active, constants_1.OrderStatuses.part_accepted, constants_1.OrderStatuses.full_accepted] } }, function (err, orders) {
            WithdrawOrder_1["default"].find({ pay_account_id: new mongoose_1["default"].Types.ObjectId(pay_account._id), confirmed: false }, function (err, withdraws) {
                if (!err) {
                    var in_orders_1 = 0;
                    var in_withdraw_1 = 0;
                    orders.forEach(function (doc) {
                        in_orders_1 += doc.amount_to_sell;
                    });
                    withdraws.forEach(function (doc) {
                        in_withdraw_1 += doc.amount;
                    });
                    pay_account["busy"] = in_orders_1 + in_withdraw_1;
                    resolve(pay_account);
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
exports.GetUserClientPayAccounts = function (userId) {
    return new Promise(function (resolve, reject) {
        var accountProjection = {
            __v: false,
            updatedAt: false,
            createdAt: false,
            user_id: false,
            status_account_purse: false
        };
        ClientPayAccount_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(userId), status_account_purse: constants_1.ClientPayAccountStatuses.active }, accountProjection, function (err, docs) {
            if (!err) {
                if (docs.length) {
                    var tasks = docs.map(function (doc) {
                        return exports.GetBusyBalance(doc.toObject());
                    });
                    Promise.all(tasks).then(function (res) {
                        resolve(res);
                    });
                }
                else {
                    resolve([]);
                }
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetAwailableBalance = function (pay_account_id) {
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(pay_account_id) }, function (err, clientPayAccount) {
            if ((!err) && (clientPayAccount)) {
                ClientOrder_1["default"].find({ client_pay_id_purse: new mongoose_1["default"].Types.ObjectId(pay_account_id), type: constants_1.OrderTypes.sell, order_status: { "$in": [constants_1.OrderStatuses.active, constants_1.OrderStatuses.part_accepted, constants_1.OrderStatuses.full_accepted] } }, function (err, orders) {
                    WithdrawOrder_1["default"].find({ pay_account_id: new mongoose_1["default"].Types.ObjectId(pay_account_id), confirmed: false }, function (err, withdraws) {
                        if (!err) {
                            var in_orders_2 = 0;
                            var in_withdraw_2 = 0;
                            orders.forEach(function (doc) {
                                in_orders_2 += doc.amount_to_sell;
                            });
                            withdraws.forEach(function (doc) {
                                in_withdraw_2 += doc.amount;
                            });
                            var available = clientPayAccount.cap_balance - (in_orders_2 + in_withdraw_2);
                            resolve(available);
                        }
                        else {
                            reject(err);
                        }
                    });
                });
            }
            else {
                reject({ code: 404, msg: "purse not found" });
            }
        });
    });
};
exports.GetPurseByCurrency = function (user_id, payment_system) {
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].findOne({ user_id: new mongoose_1["default"].Types.ObjectId(user_id), payment_system: payment_system }, function (err, clientPayAccount) {
            if ((!err) && (clientPayAccount)) {
                resolve(clientPayAccount);
            }
            else {
                reject({ code: 404, msg: "purse not found" });
            }
        });
    });
};
exports.GetHistory = function (client_account_purse) {
    return new Promise(function (resolve, reject) {
        ClientPayAccount_1["default"].findOne({ client_account_purse: client_account_purse }, function (err, clientPayAccount) {
            if ((!err) && (clientPayAccount)) {
                ClientOperation_1["default"].find({ client_pay_id: clientPayAccount._id })
                    .populate("order_id")
                    .exec(function (err, clientOperations) {
                    if (!err) {
                        resolve(clientOperations);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject({ code: 404, msg: "purse not found" });
            }
        });
    });
};
exports.CreateWithdrawOrder = function (user_id, pay_account_id, amount, address, payment_system) {
    return new Promise(function (resolve, reject) {
        new WithdrawOrder_1["default"]({
            user_id: new mongoose_1["default"].Types.ObjectId(user_id),
            pay_account_id: new mongoose_1["default"].Types.ObjectId(pay_account_id),
            amount: amount,
            confirmed: false,
            payment_system: payment_system,
            address: address
        }).save(function (err, saved) {
            if (!err) {
                resolve(saved);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetWithdrawOrders = function () {
    return new Promise(function (resolve, reject) {
        var accountProjection = {
            __v: false
        };
        WithdrawOrder_1["default"].find({}, accountProjection)
            .populate("user_id")
            .populate("pay_account_id")
            .exec(function (err, docs) {
            if (!err) {
                var result = docs.map(function (doc) {
                    var docObj = doc.toObject();
                    delete docObj["user_id"]["password"];
                    docObj["user"] = docObj["user_id"];
                    delete docObj["user_id"];
                    docObj["pay_account"] = docObj["pay_account_id"];
                    delete docObj["pay_account_id"];
                    return docObj;
                });
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetUserWithdrawOrders = function (user_id) {
    return new Promise(function (resolve, reject) {
        WithdrawOrder_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, docs) {
            if (err) {
                reject(err);
            }
            else {
                resolve(docs);
            }
        });
    });
};
exports.ConfirmWithdrawOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        WithdrawOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { confirmed: true } }, function (err, updated) {
            if (!err) {
                WithdrawOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, doc) {
                    if (!err) {
                        resolve(doc);
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
};
exports.ReferalEarned = function (user_id) {
    return new Promise(function (resolve, reject) {
        var projection = {
            __v: false,
            updatedAt: false,
            createdAt: false,
            user_id: false
        };
        ClientOperation_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id), type: constants_1.ClientOperationTypes.pp }, projection)
            .populate("client_pay_id")
            .populate("pp_id")
            .exec(function (err, operations) {
            var currencies = operations.map(function (operation) {
                return operation["client_pay_id"]["payment_system"];
            });
            var profits = currencies.map(function (currency) {
                var currency_oparations = operations.filter(function (operation) {
                    return operation["client_pay_id"]["payment_system"] == currency;
                });
                var profit = 0;
                currency_oparations.forEach(function (operation) {
                    profit += operation["balance_after"] - operation["balance_before"];
                });
                return {
                    currency: currency,
                    profit: profit
                };
            });
            var partner_operations = operations.map(function (operation) {
                operation = operation.toObject();
                delete operation["client_pay_id"];
                delete operation["withdraw_id"];
                operation["amount"] = operation["pp_id"]["amount"];
                delete operation["pp_id"];
                return operation;
            });
            var response = {
                profits: profits,
                partner_operations: partner_operations
            };
            resolve(response);
        });
    });
};
exports.PartnerInfo = function (user_id) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, user) {
            if (user) {
                exports.ReferalEarned(user_id).then(function (earned) {
                    exports.GetUserClientPayAccounts(user_id).then(function (balances) {
                        var data = {
                            link: user.partner_key,
                            earned: earned,
                            balances: balances
                        };
                        resolve(data);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                reject({ code: 404, msg: "Not found" });
            }
        });
    });
};
//# sourceMappingURL=clientPayAccount.js.map