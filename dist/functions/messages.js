"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.CloseTicket = exports.TicketsAdmin = exports.CreateMessageAdmin = exports.CreateMessage = exports.TicketMessages = exports.Tickets = exports.CreateTicket = void 0;
var messageDb = __importStar(require("../database/messages"));
var email_1 = require("../util/email");
exports.CreateTicket = function (user_id, text) {
    return new Promise(function (resolve, reject) {
        messageDb.CreateTicket(user_id, text).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Tickets = function (user_id) {
    return new Promise(function (resolve, reject) {
        messageDb.Tickets(user_id).then(function (list) {
            resolve(list);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.TicketMessages = function (_id, me) {
    return new Promise(function (resolve, reject) {
        messageDb.TicketMessages(_id, me).then(function (list) {
            resolve(list);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CreateMessage = function (user_id, text, ticket) {
    return new Promise(function (resolve, reject) {
        messageDb.CreateMessage(user_id, text, ticket).then(function (saved) {
            resolve(saved);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CreateMessageAdmin = function (user_id, text, ticket) {
    return new Promise(function (resolve, reject) {
        messageDb.CreateMessageAdmin(user_id, text, ticket).then(function (user) {
            console.log(user);
            email_1.sendEmail(user.email, "У вас новое сообщение в тикете", text, "<p>" + text + "</p>").then(function () {
                resolve(user);
            })["catch"](function (err) {
                console.log(err);
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.TicketsAdmin = function (page) {
    return new Promise(function (resolve, reject) {
        messageDb.TicketsAdmin(page).then(function (list) {
            resolve(list);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CloseTicket = function (_id) {
    return new Promise(function (resolve, reject) {
        messageDb.CloseTicket(_id).then(function (doc) {
            resolve(doc);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=messages.js.map