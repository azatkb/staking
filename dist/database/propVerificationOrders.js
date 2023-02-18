"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var PropVerificationOrder_1 = __importDefault(require("../models/PropVerificationOrder"));
var Prop_1 = __importDefault(require("../models/Prop"));
var constants_1 = require("../util/constants");
exports.SendPropVerificationOrder = function (prop_id, photo_1, photo_2) {
    if (photo_2 === void 0) { photo_2 = null; }
    return new Promise(function (resolve, reject) {
        var order = new PropVerificationOrder_1["default"]({
            prop_id: new mongoose_1["default"].Types.ObjectId(prop_id),
            photo_1: photo_1,
            photo_2: photo_2,
            verif_status: constants_1.VerifyStatus.waiting_review
        });
        order.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.ResendProperificationOrder = function (_id, photo_1, photo_2) {
    if (photo_2 === void 0) { photo_2 = null; }
    return new Promise(function (resolve, reject) {
        PropVerificationOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                photo_1: photo_1,
                photo_2: photo_2,
                verif_status: constants_1.VerifyStatus.waiting_review
            } }, function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.DeclinePropVerificationOrder = function (_id, declineReason) {
    return new Promise(function (resolve, reject) {
        PropVerificationOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: {
                verif_status: constants_1.VerifyStatus.declined,
                decline_reason: declineReason,
                photo_1: null,
                photo_2: null
            } }, function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.AprooveOrderVerificationOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        PropVerificationOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { verif_status: constants_1.VerifyStatus.verfied } }, function (err, saved) {
            if (!err) {
                PropVerificationOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, order) {
                    Prop_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(order.prop_id) }, { $set: {
                            verif_pop: true
                        } }, function (err, saved) {
                        if (!err) {
                            resolve({ code: 200 });
                        }
                        else {
                            reject(err);
                        }
                    });
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetVerificationOrder = function (_id) {
    return new Promise(function (resolve, reject) {
        PropVerificationOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, order) {
            if (order) {
                resolve(order);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetOrders = function () {
    return new Promise(function (resolve, reject) {
        PropVerificationOrder_1["default"].find({ verif_status: constants_1.VerifyStatus.waiting_review })
            .populate("prop_id")
            .exec(function (err, orders) {
            if (!err) {
                var result = orders.map(function (order) {
                    var prop = order['prop_id'];
                    return {
                        _id: order._id,
                        currency_prop: prop.currency_prop,
                        prop_num: prop.prop_num,
                        photo_1: order.photo_1,
                        photo_2: order.photo_2
                    };
                });
                resolve(result);
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=propVerificationOrders.js.map