"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var priceSchema = new mongoose_1["default"].Schema({
    price: Number,
    time: Number
}, { timestamps: true });
var Price = mongoose_1["default"].model("Price", priceSchema);
exports["default"] = Price;
//# sourceMappingURL=Price.js.map