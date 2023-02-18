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
var express_1 = __importDefault(require("express"));
var auth_1 = require("../config/auth");
var chatFunctions = __importStar(require("../functions/chats"));
var app_1 = require("../app");
var routes = express_1["default"].Router();
routes.post("/send-message", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.user_id) {
        return res.status(400).send("user_id parametr is required");
    }
    if (!data.chat_id) {
        return res.status(400).send("chat_id parametr is required");
    }
    if (!data.text) {
        return res.status(400).send("text parametr is required");
    }
    if (!data.createdAt) {
        return res.status(400).send("createdAt parametr is required");
    }
    app_1.SendMessageToChat(data.chat_id, data, data.user_id);
    chatFunctions.CreateMessage(data._id, data.chat_id, data.user_id, data.text, data.createdAt).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/send-image", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.user_id) {
        return res.status(400).send("user_id parametr is required");
    }
    if (!data.chat_id) {
        return res.status(400).send("chat_id parametr is required");
    }
    if (!data.base64) {
        return res.status(400).send("base64 parametr is required");
    }
    if (!data.createdAt) {
        return res.status(400).send("createdAt parametr is required");
    }
    chatFunctions.CreateImageMessage(data._id, data.chat_id, data.user_id, data.createdAt, data.base64).then(function (doc) {
        app_1.SendMessageToChat(data.chat_id, doc, data.user_id);
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-chat", auth_1.isAuthenticated, function (req, res) {
    var chatId = req.query.chat;
    var userId = req["token"]._id;
    if (!chatId) {
        return res.status(400).send("chat_id parametr is required");
    }
    chatFunctions.GetChat(chatId, userId).then(function (doc) {
        doc["companion"]["online"] = app_1.CheckIsOnline(chatId, doc["companion"]["_id"]);
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-chats", auth_1.isAuthenticated, function (req, res) {
    var userId = req["token"]._id;
    chatFunctions.GetChats(userId).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-chats-for-admin", auth_1.isAuthenticated, function (req, res) {
    chatFunctions.GetChatsForAdmin().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=chats.js.map