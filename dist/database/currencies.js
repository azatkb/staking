"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Currency_1 = __importDefault(require("../models/Currency"));
exports.UpdateCurrency = function (_id, code, name) {
    return new Promise(function (resolve, reject) {
        Currency_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { name: name, code: code } }, function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetAllCurrenies = function () {
    return new Promise(function (resolve, reject) {
        Currency_1["default"].find({}, function (err, list) {
            if (!err) {
                resolve(list);
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=currencies.js.map