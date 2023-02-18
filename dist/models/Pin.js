"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var currencySchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    pin: String
}, { timestamps: true });
var Currency = mongoose_1["default"].model("Pin", currencySchema);
exports["default"] = Currency;
//# sourceMappingURL=Pin.js.map