"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var cashSettingSchema = new mongoose_1["default"].Schema({
    status: Boolean,
    cash_currency: String,
    short_cash_cur: String,
    country: String,
    city: String,
    logo: String,
    cur_estandart: String,
    city_estandart: String
}, { timestamps: true });
var CashSetting = mongoose_1["default"].model("CashSetting", cashSettingSchema);
exports["default"] = CashSetting;
//# sourceMappingURL=CashSetting.js.map