"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var winston_1 = __importDefault(require("winston"));
var options = {
    transports: [
        new winston_1["default"].transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston_1["default"].transports.File({ filename: "debug.log", level: "debug" })
    ]
};
var logger = winston_1["default"].createLogger(options);
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports["default"] = logger;
//# sourceMappingURL=logger.js.map