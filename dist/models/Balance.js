"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var balanceSchema = new mongoose_1["default"].Schema({
    wallet: String,
    amount: Number
}, { timestamps: true });
var Balance = mongoose_1["default"].model("balance", balanceSchema);
exports["default"] = Balance;
//# sourceMappingURL=Balance.js.map