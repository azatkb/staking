"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
exports.validateCurrency = function (currency) {
    var available = Object.keys(constants_1.Currencies).map(function (key) { return constants_1.Currencies[key]; });
    return available.includes(currency);
};
//# sourceMappingURL=currencyValidator.js.map