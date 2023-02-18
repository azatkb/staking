"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var AlowedIpSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    ip: String
}, { timestamps: true });
var AlowedIp = mongoose_1["default"].model("AlowedIp", AlowedIpSchema);
exports["default"] = AlowedIp;
//# sourceMappingURL=AlowedIp.js.map