"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var verificationOrderSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    verif_status: String,
    passport1: String,
    passport2: String,
    other_doc: String,
    decline_reason: String
}, { timestamps: true });
var VerificationOrder = mongoose_1["default"].model("VerificationOrder", verificationOrderSchema);
exports["default"] = VerificationOrder;
//# sourceMappingURL=VerificationOrder.js.map