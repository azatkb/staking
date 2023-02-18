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
exports.GetDividents = exports.WithdrawAll = exports.WithdrawReword = exports.GetBalance = exports.List = exports.InvestEth = void 0;
var transactionsDb = __importStar(require("../database/transactions"));
exports.InvestEth = function (amount, type, wallet, days, percents, hash) {
    return new Promise(function (resolve, reject) {
        transactionsDb.InvestEth(amount, type, wallet, days, percents, hash).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.List = function (wallet, page) {
    return new Promise(function (resolve, reject) {
        transactionsDb.List(wallet, page).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetBalance = function (wallet) {
    return new Promise(function (resolve, reject) {
        transactionsDb.GetBalance(wallet).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.WithdrawReword = function (wallet, amount) {
    return new Promise(function (resolve, reject) {
        transactionsDb.WithdrawReword(wallet, amount).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.WithdrawAll = function (wallet) {
    return new Promise(function (resolve, reject) {
        transactionsDb.WithdrawAll(wallet).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetDividents = function (wallet) {
    return new Promise(function (resolve, reject) {
        transactionsDb.GetDividents(wallet).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=transactions.js.map