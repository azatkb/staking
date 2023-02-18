"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var clientOrderSchema = new mongoose_1["default"].Schema({
    order_id: String,
    client_id_from: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    client_id_to: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    auto: Boolean,
    type: String,
    client_pay_id_purse: {
        ref: 'ClientPayAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    amount_to_sell: Number,
    rate: Number,
    amount_to_buy: Number,
    all_amount: Boolean,
    for_verified: Boolean,
    order_status: String,
    receive_type: String,
    props: Object,
    cash_props: Object,
    time_to_live: Date,
    note: String
}, { timestamps: true });
var ClientOrder = mongoose_1["default"].model("ClientOrder", clientOrderSchema);
exports["default"] = ClientOrder;
//# sourceMappingURL=ClientOrder.js.map