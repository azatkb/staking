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
var cashSettingsDb = __importStar(require("../database/cashSettings"));
var image_1 = require("../util/image");
exports.AddCashSetting = function (status, cash_currency, short_cash_cur, country, city, logo, cur_estandart, city_estandart) {
    return new Promise(function (resolve, reject) {
        cashSettingsDb.CheckUnique(cash_currency, country, city).then(function (exists) {
            if (!exists) {
                image_1.saveImage(logo, "cash", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
                    cashSettingsDb.AddCashSetting(status, cash_currency, short_cash_cur, country, city, path, cur_estandart, city_estandart).then(function (res) {
                        resolve(res);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                reject({ code: 400, msg: "alredy exists" });
            }
        });
    });
};
exports.UpdateCashSetting = function (_id, status, cash_currency, short_cash_cur, country, city, logo, cur_estandart, city_estandart) {
    return new Promise(function (resolve, reject) {
        if (logo.indexOf("base64") > (-1)) {
            image_1.saveImage(logo, "cash", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
                cashSettingsDb.UpdateCashSetting(_id, status, cash_currency, short_cash_cur, country, city, path, cur_estandart, city_estandart).then(function (res) {
                    resolve(res);
                })["catch"](function (err) {
                    reject(err);
                });
                ;
            })["catch"](function (err) {
                reject(err);
            });
        }
        else {
            cashSettingsDb.UpdateCashSetting(_id, status, cash_currency, short_cash_cur, country, city, logo, cur_estandart, city_estandart).then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                reject(err);
            });
        }
    });
};
exports.GetCashSettings = function () {
    return new Promise(function (resolve, reject) {
        cashSettingsDb.GetCashSettings().then(function (list) {
            resolve(list);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetAllCashSettings = function () {
    return new Promise(function (resolve, reject) {
        cashSettingsDb.GetAllCashSettings().then(function (list) {
            resolve(list);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=cashSettings.js.map