"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var supportMessagesDb = __importStar(require("../database/supportMessage"));
var email_1 = require("../util/email");
exports.SendSupportMessage = function (category, text, email, ip) {
    return new Promise(function (resolve, reject) {
        supportMessagesDb.SendSupportMessage(category, text, email, ip).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetSupportMessages = function (page) {
    return new Promise(function (resolve, reject) {
        supportMessagesDb.GetSupportMessages(page).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AnswerSupportMessage = function (messageId, unswer) {
    return new Promise(function (resolve, reject) {
        supportMessagesDb.AnswerSupportMessage(messageId, unswer).then(function (message) {
            email_1.sendEmail(message.email, "p2p trading support", unswer).then(function (message) {
                resolve({ code: 200 });
            })["catch"](function (err) {
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=supportMesages.js.map