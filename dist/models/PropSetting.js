"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var propSettingSchema = new mongoose_1["default"].Schema({
    curency_prop: String,
    payment_system_prop: String,
    payment_sys_short_name: String,
    regular_check: String,
    logo: String,
    estandart: String,
    to_verif: Boolean,
    status: Boolean
}, { timestamps: true });
var PropSetting = mongoose_1["default"].model("PropSetting", propSettingSchema);
exports["default"] = PropSetting;
//# sourceMappingURL=PropSetting.js.map