"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var CashSetting_1 = __importDefault(require("../models/CashSetting"));
exports.CheckUnique = function (cash_currency, country, city) {
    return new Promise(function (resolve, reject) {
        CashSetting_1["default"].find({ cash_currency: cash_currency, country: country, city: city }, function (err, docs) {
            if (docs.length > 0) {
                resolve(true);
            }
            else {
                resolve(false);
            }
            ;
        });
    });
};
exports.AddCashSetting = function (status, cash_currency, short_cash_cur, country, city, logo, cur_estandart, city_estandart) {
    return new Promise(function (resolve, reject) {
        var cashSetting = new CashSetting_1["default"]({
            status: status,
            cash_currency: cash_currency,
            short_cash_cur: short_cash_cur,
            country: country,
            city: city,
            logo: logo,
            cur_estandart: cur_estandart,
            city_estandart: city_estandart
        });
        cashSetting.save(function (err, saved) {
            if (!err) {
                resolve(saved);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.UpdateCashSetting = function (_id, status, cash_currency, short_cash_cur, country, city, logo, cur_estandart, city_estandart) {
    return new Promise(function (resolve, reject) {
        CashSetting_1["default"].updateOne({ _id: mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                status: status,
                cash_currency: cash_currency,
                short_cash_cur: short_cash_cur,
                country: country,
                city: city,
                logo: logo,
                cur_estandart: cur_estandart,
                city_estandart: city_estandart
            } }, function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetCashSettings = function () {
    return new Promise(function (resolve, reject) {
        CashSetting_1["default"].find({ status: true }, function (err, list) {
            if (!err) {
                resolve(list);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetAllCashSettings = function () {
    return new Promise(function (resolve, reject) {
        CashSetting_1["default"].find({}, function (err, list) {
            if (!err) {
                resolve(list);
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=cashSettings.js.map