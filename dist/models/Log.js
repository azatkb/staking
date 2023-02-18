"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var logSchema = new mongoose_1["default"].Schema({
    ip: String,
    type: String,
    wallet: String
}, { timestamps: true });
var Log = mongoose_1["default"].model("log", logSchema);
exports["default"] = Log;
//# sourceMappingURL=Log.js.map