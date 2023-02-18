"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ratingSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    bad: Number,
    good: Number,
    rating: Number,
    total: Number
}, { timestamps: true });
var Rating = mongoose_1["default"].model("Rating", ratingSchema);
exports["default"] = Rating;
//# sourceMappingURL=Rating.js.map