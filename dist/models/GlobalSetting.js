"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var globalSettingSchema = new mongoose_1["default"].Schema({
    order_life_time: Number,
    min_order_life_time: Number,
    break_up: Number,
    breakup_text: String
}, { timestamps: true });
var GlobalSetting = mongoose_1["default"].model("GlobalSetting", globalSettingSchema);
exports["default"] = GlobalSetting;
//# sourceMappingURL=GlobalSetting.js.map