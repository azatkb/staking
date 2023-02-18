"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var clientPayAccountSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    status_account_purse: String,
    payment_system: String,
    client_account_purse: String,
    cap_balance: Number
}, { timestamps: true });
var ClientPayAccount = mongoose_1["default"].model("ClientPayAccount", clientPayAccountSchema);
exports["default"] = ClientPayAccount;
//# sourceMappingURL=ClientPayAccount.js.map