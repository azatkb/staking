"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var propSchema = new mongoose_1["default"].Schema({
    user_id: {
        ref: 'User',
        type: mongoose_1["default"].Types.ObjectId
    },
    prop_type_id: {
        ref: 'PropSetting',
        type: mongoose_1["default"].Types.ObjectId
    },
    currency_prop: String,
    payment_system_prop: String,
    prop_num: String,
    verif_pop: Boolean
}, { timestamps: true });
var Prop = mongoose_1["default"].model("Prop", propSchema);
exports["default"] = Prop;
//# sourceMappingURL=Prop.js.map