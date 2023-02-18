"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var VerificationOrder_1 = __importDefault(require("../models/VerificationOrder"));
var User_1 = __importDefault(require("../models/User"));
var constants_1 = require("../util/constants");
var FormatResponse = function (order) {
    var user = order["user_id"];
    var formated = {
        order: {
            _id: order._id,
            passport1: order.passport1,
            passport2: order.passport2,
            other_doc: order.other_doc
        },
        user: {
            _id: user._id,
            email: user.email,
            login: user.login,
            status: user.status,
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            verif_status: user.verif_status,
            self_info: user.self_info,
            passport_num: user.passport_num,
            country: user.country,
            phone: user.phone,
            address: user.address,
            timezone: user.timezone,
            lang: user.lang
        }
    };
    return formated;
};
exports.CreateVerificationOrder = function (userId, passport1, passport2, other_doc) {
    return new Promise(function (resolve, reject) {
        var order = new VerificationOrder_1["default"]({
            user_id: new mongoose_1["default"].Types.ObjectId(userId),
            passport1: passport1,
            passport2: passport2,
            other_doc: other_doc,
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
exports.ResendVerificationOrder = function (userId, passport1, passport2, other_doc) {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].updateOne({ user_id: new mongoose_1["default"].Types.ObjectId(userId) }, { $set: {
                passport1: passport1,
                passport2: passport2,
                other_doc: other_doc,
                verif_status: constants_1.VerifyStatus.waiting_review,
                decline_reaseon: null
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
exports.DeclineVerificationOrder = function (id, declineReason) {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(id) }, { $set: {
                verif_status: constants_1.VerifyStatus.declined,
                decline_reason: declineReason,
                passport1: null,
                passport2: null,
                other_doc: null
            } }, function (err, saved) {
            if (!err) {
                VerificationOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(id) }, function (err, order) {
                    User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(order.user_id) }, function (err, user) {
                        resolve(user);
                    });
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.AprooveVerificationOrder = function (id) {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(id) }, { $set: { verif_status: constants_1.VerifyStatus.verfied } }, function (err, saved) {
            if (!err) {
                VerificationOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(id) }, function (err, order) {
                    User_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(order.user_id) }, { $set: {
                            verif_status: constants_1.VerifyStatus.verfied
                        } }, function (err, saved) {
                        if (!err) {
                            User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(order.user_id) }, function (err, user) {
                                resolve(user);
                            });
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
exports.GetMyOrder = function (userId) {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].findOne({ user_id: new mongoose_1["default"].Types.ObjectId(userId) }, function (err, order) {
            if (!err) {
                resolve(order);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetOrder = function (id) {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(id) })
            .populate("user_id")
            .exec(function (err, order) {
            if (!err) {
                var response = FormatResponse(order);
                resolve(response);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.Orders = function () {
    return new Promise(function (resolve, reject) {
        VerificationOrder_1["default"].find({ verif_status: constants_1.VerifyStatus.waiting_review })
            .populate("user_id")
            .exec(function (err, orders) {
            if (!err) {
                var response = orders.map(function (order) {
                    return FormatResponse(order);
                });
                resolve(response);
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=verification.js.map