"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.TicketMessages = exports.CloseTicket = exports.TicketsAdmin = exports.CreateMessageAdmin = exports.CreateMessage = exports.Tickets = exports.CreateTicket = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Message_1 = __importDefault(require("../models/Message"));
var Ticket_1 = __importDefault(require("../models/Ticket"));
var User_1 = __importDefault(require("../models/User"));
exports.CreateTicket = function (user_id, text) {
    return new Promise(function (resolve, reject) {
        new Ticket_1["default"]({ text: text, user_id: new mongoose_1["default"].Types.ObjectId(user_id), changed: new mongoose_1["default"].Types.ObjectId(user_id) })
            .save(function (err, ticket) {
            if (!err) {
                new Message_1["default"]({ text: text, user_id: new mongoose_1["default"].Types.ObjectId(user_id), ticket: ticket._id })
                    .save(function (err, saved) {
                    if (!err) {
                        resolve(saved);
                    }
                    else {
                        reject({ code: 404 });
                    }
                });
            }
            else {
                reject({ code: 404 });
            }
        });
    });
};
exports.Tickets = function (user_id) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) })
            .populate('user_id')
            .sort({ createdAt: -1 })
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
exports.CreateMessage = function (user_id, text, ticket) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(ticket) }, { $set: { changed: new mongoose_1["default"].Types.ObjectId(user_id) } }, function (err, updated) {
            new Message_1["default"]({ text: text, user_id: new mongoose_1["default"].Types.ObjectId(user_id), ticket: new mongoose_1["default"].Types.ObjectId(ticket) })
                .save(function (err, saved) {
                if (!err) {
                    resolve(saved);
                }
                else {
                    reject({ code: 404 });
                }
            });
        });
    });
};
exports.CreateMessageAdmin = function (user_id, text, ticket) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(ticket) }, function (err, ticketDoc) {
            User_1["default"].findOne({ _id: ticketDoc.user_id }, function (err, user) {
                Ticket_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(ticket) }, { $set: { changed: new mongoose_1["default"].Types.ObjectId(user_id) } }, function (err, updated) {
                    new Message_1["default"]({ text: text, user_id: new mongoose_1["default"].Types.ObjectId(user_id), ticket: new mongoose_1["default"].Types.ObjectId(ticket) })
                        .save(function (err, saved) {
                        if (!err) {
                            resolve(user);
                        }
                        else {
                            reject({ code: 404 });
                        }
                    });
                });
            });
        });
    });
};
exports.TicketsAdmin = function (page) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].count({}, function (err, count) {
            Ticket_1["default"].find({})
                .limit(10)
                .skip(10 * page)
                .sort({ createdAt: -1 })
                .populate('user_id')
                .exec(function (err, docs) {
                if (!err) {
                    resolve({
                        list: docs,
                        count: count
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
exports.CloseTicket = function (_id) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { closed: true } }, function (err) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.TicketMessages = function (_id, me) {
    return new Promise(function (resolve, reject) {
        Ticket_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, doc) {
            if (doc.changed && doc.changed.toString() !== me) {
                Ticket_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { changed: null } }, function (err, updated) {
                    Message_1["default"].find({ ticket: new mongoose_1["default"].Types.ObjectId(_id) })
                        .exec(function (err, docs) {
                        if (!err) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                });
            }
            else {
                Message_1["default"].find({ ticket: new mongoose_1["default"].Types.ObjectId(_id) })
                    .exec(function (err, docs) {
                    if (!err) {
                        resolve(docs);
                    }
                    else {
                        reject(err);
                    }
                });
            }
        });
    });
};
//# sourceMappingURL=messages.js.map