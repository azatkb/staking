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
var wallet = __importStar(require("../wallet/wallet"));
exports.CreateAccaunt = function (sys_account_num, currency, payment_system, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out) {
    return new Promise(function (resolve, reject) {
        systemAccountDb.CreateAccaunt(sys_account_num, currency, payment_system, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateAccaunt = function (_id, sys_account_num, currency, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out) {
    return new Promise(function (resolve, reject) {
        systemAccountDb.UpdateAccount(_id, sys_account_num, currency, short_name, service_comission_in, pay_comission_in, pay_fix_comission_in, service_comission_out, pay_comission_out).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.List = function () {
    return new Promise(function (resolve, reject) {
        systemAccountDb.List().then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Balance = function () {
    return new Promise(function (resolve, reject) {
        wallet.GetMainWalletBalance().then(function (data) {
            systemAccountDb.List().then(function (accaunts) {
                var tasks = [];
                Object.keys(data).forEach(function (key) {
                    var filtered = accaunts.filter(function (acc) { return acc.currency == key; });
                    if (filtered.length) {
                        tasks.push(systemAccountDb.UpdateSystemAccountData(filtered[0]["_id"], data[key]));
                    }
                });
                if (tasks.length) {
                    Promise.all(tasks).then(function (result) {
                        resolve(result);
                    })["catch"](function (err) {
                        reject(err);
                    });
                }
                else {
                    resolve({ code: 200 });
                }
            })["catch"](function (err) {
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=systemAccaunt.js.map