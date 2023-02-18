"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Country_1 = __importDefault(require("../models/Country"));
exports.GetAllCountries = function () {
    return new Promise(function (resolve, reject) {
        Country_1["default"].find({}, function (err, list) {
            if (!err) {
                resolve(list);
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=countries.js.map