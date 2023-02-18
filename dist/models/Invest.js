"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var investSchema = new mongoose_1["default"].Schema({
    wallet: String,
    amount: Number,
    days: Number,
    percents: Number,
    start: Date
}, { timestamps: true });
var Invest = mongoose_1["default"].model("invest", investSchema);
exports["default"] = Invest;
//# sourceMappingURL=Invest.js.map