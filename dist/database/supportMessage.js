"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var SupportMessage_1 = __importDefault(require("../models/SupportMessage"));
exports.SendSupportMessage = function (category, text, email, ip) {
    return new Promise(function (resolve, reject) {
        var message = new SupportMessage_1["default"]({
            category: category,
            email: email,
            text: text,
            ip: ip
        });
        message.save(function (err, doc) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetSupportMessages = function (page) {
    return new Promise(function (resolve, reject) {
        SupportMessage_1["default"].find({})
            .skip(page * 20)
            .limit(20)
            .exec(function (err, docs) {
            if (!err) {
                resolve(docs);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.AnswerSupportMessage = function (messageId, answer) {
    return new Promise(function (resolve, reject) {
        SupportMessage_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(messageId) }, { $set: { answer: answer } }, function (err, mod) {
            if (!err) {
                SupportMessage_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(messageId) }, function (err, message) {
                    if (!err) {
                        resolve(message);
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
//# sourceMappingURL=supportMessage.js.map