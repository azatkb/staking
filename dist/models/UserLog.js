"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var userLogSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    login_ip: String
}, { timestamps: true });
var UserLog = mongoose_1["default"].model("UserLog", userLogSchema);
exports["default"] = UserLog;
//# sourceMappingURL=UserLog.js.map