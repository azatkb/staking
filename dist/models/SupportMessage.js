"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var supportMessageSchema = new mongoose_1["default"].Schema({
    category: String,
    text: String,
    ip: String,
    email: String,
    answer: String
}, { timestamps: true });
var SupportMessage = mongoose_1["default"].model("SupportMessage", supportMessageSchema);
exports["default"] = SupportMessage;
//# sourceMappingURL=SupportMessage.js.map