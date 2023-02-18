"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1["default"].Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    middlename: String,
    phone: String,
    address: String,
    role: String,
    birthday: Date,
    ip: String,
    can_change_permissions: Boolean,
    can_transact: Boolean,
    can_ban: Boolean
}, { timestamps: true });
var User = mongoose_1["default"].model("User", userSchema);
exports["default"] = User;
//# sourceMappingURL=User.js.map