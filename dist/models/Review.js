"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var reviewSchema = new mongoose_1["default"].Schema({
    client_id_from: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    client_id_to: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    order_id: {
        ref: 'ClientOrder',
        type: mongoose_1["default"].Types.ObjectId
    },
    type: String,
    amount_grade: String,
    rev_text: String,
    status: String
}, { timestamps: true });
var Review = mongoose_1["default"].model("Review", reviewSchema);
exports["default"] = Review;
//# sourceMappingURL=Review.js.map