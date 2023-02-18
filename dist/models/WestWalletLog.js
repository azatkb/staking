"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var westWalletLogSchema = new mongoose_1["default"].Schema({
    pay_account_id: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: "ClientPayAccount"
    },
    log: Object
}, { timestamps: true });
var WestWalletLog = mongoose_1["default"].model("WestWalletLog", westWalletLogSchema);
exports["default"] = WestWalletLog;
//# sourceMappingURL=WestWalletLog.js.map