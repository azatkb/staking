"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var chatMessageSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    chat_id: {
        ref: 'Chat',
        type: mongoose_1["default"].Types.ObjectId
    },
    text: String,
    type: String,
    path: String
}, { timestamps: true });
var ChatMessage = mongoose_1["default"].model("ChatMessage", chatMessageSchema);
exports["default"] = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map