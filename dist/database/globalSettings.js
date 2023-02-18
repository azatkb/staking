"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var GlobalSetting_1 = __importDefault(require("../models/GlobalSetting"));
var SystemAccount_1 = __importDefault(require("../models/SystemAccount"));
exports.InitBlobalSettings = function () {
    return new Promise(function (resolve, reject) {
        GlobalSetting_1["default"].countDocuments(function (err, count) {
            if (!count) {
                new GlobalSetting_1["default"]({
                    order_life_time: 10,
                    min_order_life_time: 1,
                    break_up: 1,
                    breakup_text: "Technical works"
                }).save(function (err, doc) {
                    if (!err) {
                        SystemAccount_1["default"].countDocuments(function (err, accounts) {
                            if (!accounts) {
                                new SystemAccount_1["default"]({
                                    sys_account_num: "1",
                                    currency: "BTC",
                                    payment_system: "BTC",
                                    sys_acc_balance: 0,
                                    last_real_balance: 0,
                                    short_name: "BTC",
                                    time_api_bal: new Date(),
                                    service_comission_in: 1,
                                    pay_comission_in: 1,
                                    pay_fix_comission_in: 1,
                                    service_comission_out: 1,
                                    pay_comission_out: 1
                                }).save(function (err, doc) {
                                    if (!err) {
                                        new SystemAccount_1["default"]({
                                            sys_account_num: "1",
                                            currency: "ETH",
                                            payment_system: "ETH",
                                            sys_acc_balance: 0,
                                            last_real_balance: 0,
                                            short_name: "ETH",
                                            time_api_bal: new Date(),
                                            service_comission_in: 1,
                                            pay_comission_in: 1,
                                            pay_fix_comission_in: 1,
                                            service_comission_out: 1,
                                            pay_comission_out: 1
                                        }).save(function (err, doc) {
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
                                resolve({ code: 200 });
                            }
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.GetGlobalSettings = function () {
    return new Promise(function (resolve, reject) {
        GlobalSetting_1["default"].findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
        });
    });
};
//# sourceMappingURL=globalSettings.js.map