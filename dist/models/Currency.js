"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var currencySchema = new mongoose_1["default"].Schema({
    code: String,
    name: String
}, { timestamps: true });
var Currency = mongoose_1["default"].model("Currency", currencySchema);
exports["default"] = Currency;
//# sourceMappingURL=Currency.js.map