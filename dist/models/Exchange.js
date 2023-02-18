"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var exchangeSchema = new mongoose_1["default"].Schema({
    from_purse: String,
    to_purse: String,
    amount: Number,
    status: String,
    order_id: {
        ref: 'ClientOrder',
        type: mongoose_1["default"].Types.ObjectId
    }
}, { timestamps: true });
var Exchange = mongoose_1["default"].model("Exchange", exchangeSchema);
exports["default"] = Exchange;
//# sourceMappingURL=Exchange.js.map