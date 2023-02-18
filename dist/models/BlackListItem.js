"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var blackListItemSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    ignore_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    }
}, { timestamps: true });
var BlackListItem = mongoose_1["default"].model("BlackListItem", blackListItemSchema);
exports["default"] = BlackListItem;
//# sourceMappingURL=BlackListItem.js.map