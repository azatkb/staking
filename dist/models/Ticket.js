"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ticketSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    text: String,
    closed: Boolean,
    changed: mongoose_1["default"].Types.ObjectId
}, { timestamps: true });
var Ticket = mongoose_1["default"].model("Ticket", ticketSchema);
exports["default"] = Ticket;
//# sourceMappingURL=Ticket.js.map