"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var partnerOperationSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    client_pay_id: {
        ref: 'ClientPayAccount',
        type: mongoose_1["default"].Types.ObjectId
    },
    amount: Number
}, { timestamps: true });
var PartnerOperation = mongoose_1["default"].model("PartnerOperation", partnerOperationSchema);
exports["default"] = PartnerOperation;
//# sourceMappingURL=PartnerOperation.js.map