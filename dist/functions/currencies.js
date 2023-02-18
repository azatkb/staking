"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var currenciesDb = __importStar(require("../database/currencies"));
exports.UpdateCurrency = function (_id, code, name) {
    return new Promise(function (resolve, reject) {
        currenciesDb.UpdateCurrency(_id, code, name).then(function (currencies) {
            resolve(currencies);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetAllCurrenies = function () {
    return new Promise(function (resolve, reject) {
        currenciesDb.GetAllCurrenies().then(function (currencies) {
            resolve(currencies);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=currencies.js.map