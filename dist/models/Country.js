"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var countrySchema = new mongoose_1["default"].Schema({
    code: String,
    name: String
}, { timestamps: true });
var Country = mongoose_1["default"].model("Country", countrySchema);
exports["default"] = Country;
//# sourceMappingURL=Country.js.map