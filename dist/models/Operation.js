"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var operationSchema = new mongoose_1["default"].Schema({
    sys_account_id: {
        ref: 'SystemAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    oper_type: String,
    operator: String,
    order_id: String,
    amount: Number,
    balance_before: Number,
    balance_after: Number
}, { timestamps: true });
var Operation = mongoose_1["default"].model("Operation", operationSchema);
exports["default"] = Operation;
//# sourceMappingURL=Operation.js.map