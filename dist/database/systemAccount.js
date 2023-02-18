"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var SystemAccount_1 = __importDefault(require("../models/SystemAccount"));
var CurrencyAccount_1 = __importDefault(require("../models/CurrencyAccount"));
var util_1 = require("../util/util");
exports.Deposit = function (currency, amount) {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].findOne({ currency: currency }, function (err, systemAccount) {
            if (!err) {
                var cur_balance = systemAccount.sys_acc_balance + amount;
                var service_comission_in = systemAccount.service_comission_in;
                var amount_to_user_1 = amount - util_1.percentage(service_comission_in, amount);
                SystemAccount_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(systemAccount._id) }, { $set: { sys_acc_balance: cur_balance } }, function (err, saved) {
                    if (!err) {
                        resolve(amount_to_user_1);
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
exports.Withdraw = function (currency, amount) {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].findOne({ currency: currency }, function (err, systemAccount) {
            if (!err) {
                var service_comission_out = systemAccount.service_comission_out;
                var amount_to_user_2 = amount - util_1.percentage(service_comission_out, amount);
                var cur_balance = systemAccount.sys_acc_balance - amount_to_user_2;
                SystemAccount_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(systemAccount._id) }, { $set: { sys_acc_balance: cur_balance } }, function (err, saved) {
                    if (!err) {
                        resolve(amount_to_user_2);
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
exports.GetCurrencyAccaunt = function (currency) {
    return new Promise(function (resolve, reject) {
        CurrencyAccount_1["default"].findOne({ currency: currency }, function (err, currencyAccaunt) {
            if (!err) {
                resolve(currencyAccaunt);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.CreateAccaunt = function (sys_account_num, currency, payment_system, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out) {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].find({ payment_system: payment_system }, function (err, docs) {
            if (!docs.length) {
                new SystemAccount_1["default"]({
                    sys_account_num: sys_account_num,
                    currency: currency,
                    payment_system: payment_system,
                    sys_acc_balance: 0,
                    last_real_balance: 0,
                    short_name: short_name,
                    time_api_bal: new Date(),
                    service_comission_in: service_comission_in,
                    pay_comission_in: pay_comission_in,
                    pay_fix_comission_in: pay_fix_comission_in,
                    service_comission_out: service_comission_out,
                    pay_comission_out: pay_comission_out
                }).save(function (err, doc) {
                    if (!err) {
                        resolve(doc);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject({ code: 400, msg: "already exists" });
            }
        });
    });
};
exports.UpdateAccount = function (_id, sys_account_num, currency, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out) {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                sys_account_num: sys_account_num,
                currency: currency,
                short_name: short_name,
                service_comission_in: service_comission_in,
                pay_comission_in: pay_comission_in,
                pay_fix_comission_in: pay_fix_comission_in,
                service_comission_out: service_comission_out,
                pay_comission_out: pay_comission_out
            } }, function (err, updated) {
            if ((!err) && (updated)) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 400 });
            }
        });
    });
};
exports.List = function () {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].find({}, function (err, docs) {
            resolve(docs);
        });
    });
};
exports.UpdateSystemAccountData = function (_id, balance) {
    return new Promise(function (resolve, reject) {
        SystemAccount_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                last_real_balance: balance,
                time_api_bal: new Date()
            } }, function (err, updated) {
            if ((!err) && (updated)) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 400 });
            }
        });
    });
};
//# sourceMappingURL=systemAccount.js.map