"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
var Chat_1 = __importDefault(require("../models/Chat"));
exports.CreateMessage = function (message_id, chat_id, user_id, text, createdAt, type, path) {
    if (path === void 0) { path = null; }
    return new Promise(function (resolve, reject) {
        var message = new ChatMessage_1["default"]({
            _id: new mongoose_1["default"].Types.ObjectId(message_id),
            chat_id: new mongoose_1["default"].Types.ObjectId(chat_id),
            user_id: new mongoose_1["default"].Types.ObjectId(user_id),
            text: text,
            createdAt: createdAt,
            type: type,
            path: path
        });
        message.save(function (err, saved) {
            if (!err) {
                resolve(saved);
            }
            else {
                reject(err);
            }
            ;
        });
    });
};
exports.GetChat = function (chat_id, user_id) {
    return new Promise(function (resolve, reject) {
        Chat_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(chat_id) })
            .populate('client_id_from')
            .populate('client_id_to')
            .exec(function (err, doc) {
            if (!err) {
                ChatMessage_1["default"].find({ chat_id: new mongoose_1["default"].Types.ObjectId(chat_id) }, function (err, docs) {
                    if (!err) {
                        var seller = doc["client_id_from"];
                        var buyer = doc["client_id_to"];
                        var messages = docs.map(function (message) {
                            return {
                                _id: message._id,
                                text: message.text,
                                user_id: message.user_id,
                                chat_id: message.chat_id,
                                createdAt: message.createdAt,
                                type: message.type,
                                path: message.path
                            };
                        });
                        var companion = void 0;
                        if (seller._id == user_id) {
                            companion = {
                                _id: buyer["_id"],
                                firstname: buyer["firstname"],
                                lastname: buyer["lastname"],
                                middlename: buyer["middlename"],
                                photo: buyer["photo"]
                            };
                        }
                        else {
                            companion = {
                                _id: seller["_id"],
                                firstname: seller["firstname"],
                                lastname: seller["lastname"],
                                middlename: seller["middlename"],
                                photo: seller["photo"]
                            };
                        }
                        var response_1 = {
                            companion: companion,
                            messages: messages
                        };
                        resolve(response_1);
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
exports.GetChats = function (user_id) {
    return new Promise(function (resolve, reject) {
        Chat_1["default"].find({ $or: [{ client_id_from: new mongoose_1["default"].Types.ObjectId(user_id) }, { client_id_to: new mongoose_1["default"].Types.ObjectId(user_id) }] })
            .populate('client_id_from')
            .populate('client_id_to')
            .populate('order_id')
            .exec(function (err, chats) {
            if (!err) {
                var response_2 = chats.map(function (chat) {
                    var seller = chat["client_id_from"];
                    var buyer = chat["client_id_to"];
                    var order = chat["order_id"];
                    var companion;
                    if (seller._id == user_id) {
                        companion = {
                            _id: buyer["_id"],
                            firstname: buyer["firstname"],
                            lastname: buyer["lastname"],
                            middlename: buyer["middlename"],
                            photo: buyer["photo"]
                        };
                    }
                    else {
                        companion = {
                            _id: seller["_id"],
                            firstname: seller["firstname"],
                            lastname: seller["lastname"],
                            middlename: seller["middlename"],
                            photo: seller["photo"]
                        };
                    }
                    return {
                        _id: chat._id,
                        companion: companion,
                        order_id: order.order_id
                    };
                });
                resolve(response_2);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetChatsForAdmin = function () {
    return new Promise(function (resolve, reject) {
        Chat_1["default"].find({ open: true })
            .populate('client_id_from')
            .populate('client_id_to')
            .populate('order_id')
            .exec(function (err, chats) {
            if (!err) {
                var response_3 = chats.map(function (chat) {
                    var seller = chat["client_id_from"];
                    var buyer = chat["client_id_to"];
                    var order = chat["order_id"];
                    return {
                        _id: chat._id,
                        seller: {
                            _id: seller["_id"],
                            firstname: seller["firstname"],
                            lastname: seller["lastname"],
                            middlename: seller["middlename"],
                            photo: seller["photo"]
                        },
                        buyer: {
                            _id: buyer["_id"],
                            firstname: buyer["firstname"],
                            lastname: buyer["lastname"],
                            middlename: buyer["middlename"],
                            photo: buyer["photo"]
                        },
                        order: order
                    };
                });
                resolve(response_3);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.DeleteOrderChat = function (order_id) {
    return new Promise(function (resolve, reject) {
        Chat_1["default"].findOne({ order_id: new mongoose_1["default"].Types.ObjectId(order_id) }, function (err, chat) {
            if (!err) {
                if (chat) {
                    ChatMessage_1["default"].deleteMany({ chat_id: chat._id }, function (err) {
                        if (!err) {
                            chat.remove(function (err) {
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
                    reject({ code: 404, msg: "chat not found" });
                }
            }
            else {
                reject(err);
            }
        });
    });
};
//# sourceMappingURL=chat.js.map