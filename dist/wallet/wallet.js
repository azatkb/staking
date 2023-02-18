"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var secrets_1 = require("../util/secrets");
var westwallet_api_1 = __importDefault(require("westwallet-api"));
var westwalletErrors = require('westwallet-api/lib/errors');
exports.CreateWallet = function (label, currency, depositUrl) {
    return new Promise(function (resolve, reject) {
        var client = new westwallet_api_1["default"].WestWalletAPI(secrets_1.WESTWALLETPUBLICKEY, secrets_1.WESTWALLETPRIVATEKEY);
        client.generateAddress(currency, depositUrl, label).then(function (data) {
            resolve(data);
        })["catch"](function (error) {
            if (error instanceof westwalletErrors.CurrencyNotFoundError) {
                reject({ msg: "No such currency" });
            }
            else {
                reject({ code: 400, msg: "Error" });
            }
        });
    });
};
exports.GetMainWalletBalance = function () {
    return new Promise(function (resolve, reject) {
        var client = new westwallet_api_1["default"].WestWalletAPI(secrets_1.WESTWALLETPUBLICKEY, secrets_1.WESTWALLETPRIVATEKEY);
        client.walletBalances().then(function (data) {
            resolve(data);
        })["catch"](function (error) {
            reject({ code: 403, msg: "Error" });
        });
    });
};
exports.Withdraw = function (currency, amount, address) {
    return new Promise(function (resolve, reject) {
        var client = new westwallet_api_1["default"].WestWalletAPI(secrets_1.WESTWALLETPUBLICKEY, secrets_1.WESTWALLETPRIVATEKEY);
        client.createWithdrawal(currency, amount.toString(), address).then(function (data) {
            resolve(data);
        })["catch"](function (error) {
            if (error instanceof westwalletErrors.InsufficientFundsError) {
                reject({ code: 403, msg: "Insufficient funds" });
            }
            else if (error instanceof westwalletErrors.BadAddressError) {
                reject({ code: 403, msg: "Bad address regex" });
            }
            else {
                reject({ code: 403, msg: "Error" });
            }
        });
    });
};
//# sourceMappingURL=wallet.js.map