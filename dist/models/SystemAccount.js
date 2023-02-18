"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var systemAccountSchema = new mongoose_1["default"].Schema({
    sys_account_num: String,
    currency: String,
    payment_system: String,
    sys_acc_balance: Number,
    last_real_balance: Number,
    short_name: String,
    time_api_bal: Date,
    service_comission_in: Number,
    pay_comission_in: Number,
    pay_fix_comission_in: Number,
    service_comission_out: Number,
    pay_comission_out: Number,
    pay_fix_comission_out: Number,
    merchant_type: String,
    merchant_ip: String
}, { timestamps: true });
var SystemAccount = mongoose_1["default"].model("SystemAccount", systemAccountSchema);
exports["default"] = SystemAccount;
//# sourceMappingURL=SystemAccount.js.map