"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var withdrawOrderSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    pay_account_id: {
        ref: 'ClientPayAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    amount: Number,
    confirmed: Boolean,
    address: String,
    payment_system: String
}, { timestamps: true });
var WithdrawOrder = mongoose_1["default"].model("WithdrawOrder", withdrawOrderSchema);
exports["default"] = WithdrawOrder;
//# sourceMappingURL=WithdrawOrder.js.map