"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetLogs = exports.CreateLog = void 0;
var Log_1 = __importDefault(require("../models/Log"));
var Wallet_1 = __importDefault(require("../models/Wallet"));
exports.CreateLog = function (ip, wallet, type) {
    return new Promise(function (resolve, reject) {
        new Log_1["default"]({ ip: ip, wallet: wallet, type: type })
            .save(function (err, saved) {
            if (!err) {
                Wallet_1["default"].find({ wallet: wallet }, function (err, wallets) {
                    if (wallets.length) {
                        resolve({ code: 200, msg: "log sent." });
                    }
                    else {
                        new Wallet_1["default"]({ wallet: wallet })
                            .save(function (err, saved) {
                            resolve({ code: 200, msg: "log sent." });
                        });
                    }
                });
            }
            else {
                reject({ code: 500 });
            }
        });
    });
};
exports.GetLogs = function (wallet, page) {
    return new Promise(function (resolve, reject) {
        Log_1["default"].count({}, function (err, count) {
            Log_1["default"].find({ wallet: wallet })
                .limit(10)
                .skip(10 * page)
                .sort({ createdAt: -1 })
                .exec(function (err, docs) {
                if (!err) {
                    resolve({
                        list: docs,
                        count: count
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
//# sourceMappingURL=logs.js.map