"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var systemOperationSchema = new mongoose_1["default"].Schema({
    user_id: mongoose_1["default"].Types.ObjectId
}, { timestamps: true });
var SystemOperation = mongoose_1["default"].model("SystemOperation", systemOperationSchema);
exports["default"] = SystemOperation;
//# sourceMappingURL=SystemOperation.js.map