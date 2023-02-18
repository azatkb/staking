"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Delete = exports.Wallets = exports.GetProfit = exports.GetBalance = exports.CreateAddress = void 0;
var walletsDb = __importStar(require("../database/wallets"));
exports.CreateAddress = function (user_id, address) {
    return new Promise(function (resolve, reject) {
        walletsDb.CreateAddress(user_id, address).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetBalance = function (user_id) {
    return new Promise(function (resolve, reject) {
        walletsDb.GetBalance(user_id).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetProfit = function (user_id) {
    return new Promise(function (resolve, reject) {
        walletsDb.GetProfit(user_id).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Wallets = function (user_id) {
    return new Promise(function (resolve, reject) {
        walletsDb.Wallets(user_id).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Delete = function (_id) {
    return new Promise(function (resolve, reject) {
        walletsDb.Delete(_id).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=wallets.js.map