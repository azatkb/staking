"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1["default"].Schema({
    amount: Number,
    user_id: mongoose_1["default"].Types.ObjectId,
    completed: Boolean
}, { timestamps: true });
var Order = mongoose_1["default"].model("Order", orderSchema);
exports["default"] = Order;
//# sourceMappingURL=Order.js.map