"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var countriesDb = __importStar(require("../database/countries"));
exports.GetAllCountries = function () {
    return new Promise(function (resolve, reject) {
        countriesDb.GetAllCountries().then(function (currencies) {
            resolve(currencies);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=countries.js.map