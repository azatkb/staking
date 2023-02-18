"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var currencyAccountSchema = new mongoose_1["default"].Schema({
    reg_check: String,
    sysaccount_id: {
        ref: 'SystemAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    inout: String,
    currency: String,
    name: String,
    short_name: String,
    estandart: String,
    cur_balance: Number
}, { timestamps: true });
var CurrencyAccount = mongoose_1["default"].model("CurrencyAccount", currencyAccountSchema);
exports["default"] = CurrencyAccount;
//# sourceMappingURL=CurrencyAccount.js.map