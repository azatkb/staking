"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PORT = exports.MONGODB_URI = void 0;
var logger_1 = __importDefault(require("./logger"));
exports.MONGODB_URI = "mongodb+srv://admin:admin@cluster0.9yp9ew9.mongodb.net/staking?retryWrites=true&w=majority";
exports.PORT = process.env.PORT || 4000;
if (!exports.MONGODB_URI) {
    logger_1["default"].error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map