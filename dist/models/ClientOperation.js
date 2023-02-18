"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var clientOperationSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    client_pay_id_purse: String,
    client_pay_id: {
        ref: 'ClientPayAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    type: String,
    order_id: {
        ref: 'ClientOrder',
        type: mongoose_1["default"].Types.ObjectId
    },
    withdraw_id: {
        ref: 'WithdrowOrder',
        type: mongoose_1["default"].Types.ObjectId
    },
    deposit_id: mongoose_1["default"].Types.ObjectId,
    pp_id: {
        ref: 'PartnerOperation',
        type: mongoose_1["default"].Types.ObjectId
    },
    balance_before: Number,
    balance_after: Number
}, { timestamps: true });
var ClientOperation = mongoose_1["default"].model("ClientOperation", clientOperationSchema);
exports["default"] = ClientOperation;
//# sourceMappingURL=ClientOperation.js.map