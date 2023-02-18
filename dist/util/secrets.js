"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PORT = exports.MONGODB_URI = exports.ENVIRONMENT = void 0;
var logger_1 = __importDefault(require("./logger"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config({ path: ".env" });
exports.ENVIRONMENT = process.env.NODE_ENV;
var prod = exports.ENVIRONMENT === "production";
exports.MONGODB_URI = process.env["MONGODB_URI"];
exports.PORT = process.env["PORT"];
if (!exports.MONGODB_URI) {
    logger_1["default"].error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map