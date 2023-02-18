"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var systemAccountDb = __importStar(require("../database/systemAccount"));
var clientPayAccountDb = __importStar(require("../database/clientPayAccount"));
var wallet = __importStar(require("../wallet/wallet"));
var secrets_1 = require("../util/secrets");
var constants_1 = require("../util/constants");
exports.CreateUserWallet = function (userId, payment_system) {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.GetUserClientPayAccount(userId, payment_system).then(function (payAccount) {
            if (!payAccount) {
                wallet.CreateWallet(userId, payment_system, secrets_1.DEPOSIT_URL).then(function (walletData) {
                    clientPayAccountDb.CreatePayAccount(userId, walletData.address, payment_system).then(function () {
                        resolve({ code: 200 });
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                reject({ code: 400, msg: "Wallet already created" });
            }
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Deposit = function (client_account_purse, payment_system, amount) {
    return new Promise(function (resolve, reject) {
        systemAccountDb.Deposit(payment_system, amount).then(function (amount_to_user) {
            clientPayAccountDb.Transaction(client_account_purse, payment_system, amount_to_user).then(function () {
                resolve({ msg: "deposit successful" });
            })["catch"](function (err) {
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetUserClientPayAccounts = function (user_id) {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.GetUserClientPayAccounts(user_id).then(function (docs) {
            resolve(docs);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetHistory = function (client_account_purse) {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.GetHistory(client_account_purse).then(function (docs) {
            resolve(docs);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Withdraw = function (user_id, address, payment_system, amount) {
    return new Promise(function (resolve, reject) {
        if (amount) {
            clientPayAccountDb.GetUserClientPayAccount(user_id, payment_system).then(function (payAccount) {
                clientPayAccountDb.GetAwailableBalance(payAccount._id.toString()).then(function (awailableBalance) {
                    if (amount <= awailableBalance) {
                        clientPayAccountDb.IsOwnAddress(address).then(function (isOwn) {
                            if (!isOwn) {
                                clientPayAccountDb.CreateWithdrawOrder(user_id, payAccount._id, amount, address, payment_system).then(function () {
                                    resolve({ code: 200, msg: "withdraw in review" });
                                })["catch"](function (err) {
                                    reject(err);
                                });
                            }
                            else {
                                clientPayAccountDb.Transaction(payAccount.client_account_purse, payment_system, -amount, constants_1.ClientOperationTypes.wd).then(function () {
                                    clientPayAccountDb.Transaction(address, payment_system, amount, constants_1.ClientOperationTypes.wd).then(function () {
                                        resolve({ code: 200, msg: "withdraw suuccessful" });
                                    })["catch"](function (err) {
                                        reject(err);
                                    });
                                })["catch"](function (err) {
                                    reject(err);
                                });
                            }
                        })["catch"](function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject({ code: 400, msg: "not enough balance" });
                    }
                })["catch"](function (err) {
                    reject(err);
                });
            })["catch"](function (err) {
                reject(err);
            });
        }
        else {
            reject({ code: 400, msg: "not valide amount" });
        }
    });
};
exports.ConfirmWithdrawOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.ConfirmWithdrawOrder(_id).then(function (withdraw) {
            clientPayAccountDb.GetUserClientPayAccount(withdraw.user_id, withdraw.payment_system).then(function (payAccount) {
                clientPayAccountDb.Transaction(payAccount.client_account_purse, payAccount.payment_system, -withdraw.amount, constants_1.ClientOperationTypes.wd, null, null, withdraw._id).then(function () {
                    systemAccountDb.Withdraw(withdraw.payment_system, withdraw.amount).then(function (amount) {
                        wallet.Withdraw(withdraw.currency, amount, withdraw.address).then(function (data) {
                            resolve(data);
                        })["catch"](function (err) {
                            reject(err);
                        });
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ReferalEarned = function (user_id) {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.PartnerInfo(user_id).then(function (earned) {
            resolve(earned);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetUserWithdrawOrders = function () {
    return new Promise(function (resolve, reject) {
        clientPayAccountDb.GetWithdrawOrders().then(function (earned) {
            resolve(earned);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=clientPayAccount.js.map