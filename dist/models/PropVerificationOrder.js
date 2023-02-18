"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var propVerificationOrderSchema = new mongoose_1["default"].Schema({
    prop_id: {
        ref: 'Prop',
        type: mongoose_1["default"].Types.ObjectId
    },
    photo_1: String,
    photo_2: String,
    verif_status: String,
    decline_reason: String
}, { timestamps: true });
var PropVerificationOrder = mongoose_1["default"].model("PropVerificationOrder", propVerificationOrderSchema);
exports["default"] = PropVerificationOrder;
//# sourceMappingURL=PropVerificationOrder.js.map