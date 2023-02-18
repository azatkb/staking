"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var chatsDb = __importStar(require("../database/chat"));
var constants_1 = require("../util/constants");
var image_1 = require("../util/image");
exports.CreateMessage = function (message_id, chat_id, user_id, text, createdAt) {
    return new Promise(function (resolve, reject) {
        chatsDb.CreateMessage(message_id, chat_id, user_id, text, createdAt, constants_1.MessageTypes.text, null).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CreateImageMessage = function (message_id, chat_id, user_id, createdAt, base64) {
    return new Promise(function (resolve, reject) {
        image_1.saveImage(base64, "files", message_id).then(function (path) {
            chatsDb.CreateMessage(message_id, chat_id, user_id, null, createdAt, constants_1.MessageTypes.image, path).then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetChat = function (chat_id, user_id) {
    return new Promise(function (resolve, reject) {
        chatsDb.GetChat(chat_id, user_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetChats = function (user_id) {
    return new Promise(function (resolve, reject) {
        chatsDb.GetChats(user_id).then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetChatsForAdmin = function () {
    return new Promise(function (resolve, reject) {
        chatsDb.GetChatsForAdmin().then(function (res) {
            resolve(res);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=chats.js.map