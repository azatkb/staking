"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var propVerificationOrdersDb = __importStar(require("../database/propVerificationOrders"));
var image_1 = require("../util/image");
exports.SendPropVerificationOrder = function (prop_id, photo_1, photo_2) {
    if (photo_2 === void 0) { photo_2 = null; }
    return new Promise(function (resolve, reject) {
        image_1.saveImage(photo_1, "prop_verifications", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
            if (photo_2) {
                image_1.saveImage(photo_2, "prop_verifications", new mongoose_1["default"].Types.ObjectId()).then(function (path2) {
                    propVerificationOrdersDb.SendPropVerificationOrder(prop_id, path, path2).then(function (data) {
                        resolve(data);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                propVerificationOrdersDb.SendPropVerificationOrder(prop_id, path, null).then(function (data) {
                    resolve(data);
                })["catch"](function (err) {
                    reject(err);
                });
            }
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ResendProperificationOrder = function (_id, photo_1, photo_2) {
    if (photo_2 === void 0) { photo_2 = null; }
    return new Promise(function (resolve, reject) {
        image_1.saveImage(photo_1, "prop_verifications", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
            if (photo_2) {
                image_1.saveImage(photo_2, "prop_verifications", new mongoose_1["default"].Types.ObjectId()).then(function (path2) {
                    propVerificationOrdersDb.SendPropVerificationOrder(_id, path, path2).then(function (data) {
                        resolve(data);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                propVerificationOrdersDb.SendPropVerificationOrder(_id, path, null).then(function (data) {
                    resolve(data);
                })["catch"](function (err) {
                    reject(err);
                });
            }
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetVerificationOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        propVerificationOrdersDb.GetVerificationOrder(_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetOrders = function () {
    return new Promise(function (resolve, reject) {
        propVerificationOrdersDb.GetOrders().then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AprooveOrderVerificationOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        propVerificationOrdersDb.AprooveOrderVerificationOrder(_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.DeclinePropVerificationOrder = function (_id, declineReason) {
    return new Promise(function (resolve, reject) {
        propVerificationOrdersDb.DeclinePropVerificationOrder(_id, declineReason).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=propVerificationOrders.js.map