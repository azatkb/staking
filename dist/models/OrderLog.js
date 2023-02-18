"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var orderLogSchema = new mongoose_1["default"].Schema({
    order_id: {
        ref: 'ClientOrder',
        type: mongoose_1["default"].Types.ObjectId
    },
    order_status: String,
    merchan_req: String,
    merchan_uns: String,
    system_info: String
}, { timestamps: true });
var OrderLog = mongoose_1["default"].model("OrderLog", orderLogSchema);
exports["default"] = OrderLog;
//# sourceMappingURL=OrderLog.js.map