"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var arbitrationDb = __importStar(require("../database/arbitration"));
exports.SendRequest = function (user_id, text) {
    return new Promise(function (resolve, reject) {
        arbitrationDb.SendRequest(user_id, text).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.SetOperator = function (_id, user_id) {
    return new Promise(function (resolve, reject) {
        arbitrationDb.SetOperator(_id, user_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetRequests = function () {
    return new Promise(function (resolve, reject) {
        arbitrationDb.GetRequests().then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.SetStatus = function (_id, status) {
    return new Promise(function (resolve, reject) {
        arbitrationDb.SetStatus(_id, status).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=arbitration.js.map