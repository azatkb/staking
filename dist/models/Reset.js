"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var resetSchema = new mongoose_1["default"].Schema({
    email: String
}, { timestamps: true });
var Reset = mongoose_1["default"].model("Reset", resetSchema);
exports["default"] = Reset;
//# sourceMappingURL=Reset.js.map