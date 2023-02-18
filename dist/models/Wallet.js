"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var walletSchema = new mongoose_1["default"].Schema({
    wallet: String
}, { timestamps: true });
var Wallet = mongoose_1["default"].model("wallet", walletSchema);
exports["default"] = Wallet;
//# sourceMappingURL=Wallet.js.map