"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var emailConfirmSchema = new mongoose_1["default"].Schema({
    label: String,
    confirmed: Boolean
}, { timestamps: true });
var EmailConfirm = mongoose_1["default"].model("EmailConfirm", emailConfirmSchema);
exports["default"] = EmailConfirm;
//# sourceMappingURL=EmailConfirm.js.map