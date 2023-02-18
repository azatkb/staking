"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Arbitration_1 = __importDefault(require("../models/Arbitration"));
var Chat_1 = __importDefault(require("../models/Chat"));
var constants_1 = require("../util/constants");
exports.SendRequest = function (user_id, text) {
    return new Promise(function (resolve, reject) {
        new Arbitration_1["default"]({
            user_id: new mongoose_1["default"].Types.ObjectId(user_id),
            text: text,
            open: true
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
exports.SetOperator = function (_id, user_id) {
    return new Promise(function (resolve, reject) {
        Arbitration_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, arbitration) {
            if (!err) {
                var chat = new Chat_1["default"]({
                    client_id_from: arbitration.user_id,
                    client_id_to: user_id,
                    order_id: null,
                    type: constants_1.ChatTypes.support,
                    open: true
                });
                chat.save(function (err, saved) {
                    if (!err) {
                        Arbitration_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { operator: new mongoose_1["default"].Types.ObjectId(user_id), chat_id: saved._id } }, function (err, saved) {
                            if (!err) {
                                resolve({ code: 200 });
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetRequests = function () {
    return new Promise(function (resolve, reject) {
        Arbitration_1["default"].find({})
            .populate("user_id")
            .populate("operator")
            .exec(function (err, docs) {
            var response = docs.map(function (doc) {
                var user = doc["user_id"];
                var operator = doc["operator"];
                return {
                    _id: doc._id,
                    text: doc.text,
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        photo: user.photo
                    },
                    operator: operator ? {
                        _id: operator._id,
                        firstname: operator.firstname,
                        lastname: operator.lastname,
                        photo: operator.photo
                    } : null,
                    open: doc.open
                };
            });
            resolve(response);
        });
    });
};
exports.SetStatus = function (_id, status) {
    return new Promise(function (resolve, reject) {
        Arbitration_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { open: status } }, function (err, saved) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=arbitration.js.map