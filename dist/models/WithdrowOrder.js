"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var withdrowOrderSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    pay_account: {
        ref: 'ClientPayAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    amount: Number,
    confirmed: Boolean
}, { timestamps: true });
var WithdrowOrder = mongoose_1["default"].model("WithdrowOrder", withdrowOrderSchema);
exports["default"] = WithdrowOrder;
//# sourceMappingURL=WithdrowOrder.js.map