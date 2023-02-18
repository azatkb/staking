"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var arbitrationSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    operator: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    chat_id: {
        ref: 'Chat',
        type: mongoose_1["default"].Types.ObjectId
    },
    text: String,
    open: Boolean
}, { timestamps: true });
var Arbitration = mongoose_1["default"].model("Arbitration", arbitrationSchema);
exports["default"] = Arbitration;
//# sourceMappingURL=Arbitration.js.map