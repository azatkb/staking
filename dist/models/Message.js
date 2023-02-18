"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1["default"].Schema({
    user_id: mongoose_1["default"].Types.ObjectId,
    ticket: {
        ref: 'Ticket',
        type: mongoose_1["default"].Types.ObjectId
    },
    text: String
}, { timestamps: true });
var Message = mongoose_1["default"].model("Message", messageSchema);
exports["default"] = Message;
//# sourceMappingURL=Message.js.map