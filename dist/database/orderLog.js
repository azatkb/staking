"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var OrderLog_1 = __importDefault(require("../models/OrderLog"));
exports.CreateLog = function (order_id, order_status) {
    return new Promise(function (resolve, reject) {
        new OrderLog_1["default"]({
            order_id: new mongoose_1["default"].Types.ObjectId(order_id),
            order_status: order_status
        }).save(function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=orderLog.js.map