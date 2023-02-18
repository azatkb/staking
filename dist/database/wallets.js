"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delete = exports.Wallets = exports.GetProfit = exports.GetBalance = exports.CreateAddress = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Wallet_1 = __importDefault(require("../models/Wallet"));
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Price_1 = __importDefault(require("../models/Price"));
exports.CreateAddress = function (user_id, address) {
    return new Promise(function (resolve, reject) {
        Wallet_1["default"].findOne({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, existingWallet) {
            if (!existingWallet) {
                new Wallet_1["default"]({ address: address, user_id: new mongoose_1["default"].Types.ObjectId(user_id) })
                    .save(function (err, saved) {
                    if (!err) {
                        resolve(saved);
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                existingWallet.update({ $set: { address: address } }, function (err, saved) {
                    if (!err) {
                        resolve(saved);
                    }
                    else {
                        reject(err);
                    }
                });
            }
        });
    });
};
exports.GetBalance = function (user_id) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, docs) {
            var balance = 0;
            for (var i = 0; i < docs.length; i++) {
                balance += docs[i].amount;
            }
            resolve({ balance: balance });
        });
    });
};
var balanceToDate = function (time, transactions) {
    var trsxs = transactions.filter(function (trx) { return trx.time < time; });
    var balance = 0;
    for (var i = 0; i < trsxs.length; i++) {
        balance += trsxs[i].amount;
    }
    return balance;
};
var percDiff = function (etalon, example) {
    return +Math.abs(100 - example / etalon * 100).toFixed(10);
};
exports.GetProfit = function (user_id) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, docs) {
            Price_1["default"].find({}).sort('time').limit(10).exec(function (err, prices) {
                var transactions = docs.map(function (transaction) {
                    var trx = transaction.toObject();
                    trx["time"] = new Date(transaction["createdAt"]).getTime() / 1000;
                    return trx;
                });
                var pricesList = prices.map(function (price) {
                    var priceObj = price.toObject();
                    priceObj["balance"] = balanceToDate(price.time, transactions);
                    return priceObj;
                });
                var profits = [];
                var total = 0;
                if (pricesList.length > 1) {
                    for (var i = 1; i < pricesList.length; i++) {
                        var prev = pricesList[i - 1];
                        var current = pricesList[i];
                        var percents = percDiff(prev.price, current.price);
                        var change = prev.price > current.price ? -percents : percents;
                        var prevChash = prev.balance * prev.price;
                        var currentChash = prev.balance * current.price;
                        var diffChash = currentChash - prevChash;
                        current["change"] = change;
                        current["cash"] = diffChash;
                        profits.push(current);
                    }
                    var startPrice = pricesList[0]['price'];
                    var endPrice = pricesList[pricesList.length - 1]["price"];
                    var diff = percDiff(startPrice, endPrice);
                    total = startPrice > endPrice ? -diff : diff;
                }
                resolve({ profits: profits, total: total });
            });
        });
    });
};
exports.Wallets = function (user_id) {
    return new Promise(function (resolve, reject) {
        Wallet_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, walletes) {
            resolve(walletes);
        });
    });
};
exports.Delete = function (_id) {
    return new Promise(function (resolve, reject) {
        Wallet_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err) {
            resolve({ code: 200 });
        });
    });
};
//# sourceMappingURL=wallets.js.map