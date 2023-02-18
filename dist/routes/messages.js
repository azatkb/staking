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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_1 = require("../config/auth");
var messageFunctions = __importStar(require("../functions/messages"));
var routes = express_1["default"].Router();
routes.post("/create", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    var data = req.body;
    if (!data.text) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.ticket) {
        return res.status(400).send("ticket parametr is required");
    }
    messageFunctions.CreateMessage(user_id, data.text, data.ticket).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/admin-create", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    var data = req.body;
    if (!data.text) {
        return res.status(400).send("address parametr is required");
    }
    if (!data.ticket) {
        return res.status(400).send("ticket parametr is required");
    }
    messageFunctions.CreateMessageAdmin(user_id, data.text, data.ticket).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/create-ticket", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    var data = req.body;
    if (!data.text) {
        return res.status(400).send("address parametr is required");
    }
    messageFunctions.CreateTicket(user_id, data.text).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/tickets", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]._id;
    messageFunctions.Tickets(user_id).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/list", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    var user_id = req["token"]._id;
    messageFunctions.TicketMessages(id, user_id).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/tickets-admin", auth_1.isAdmin, function (req, res) {
    var page = req.query.page;
    if (!page) {
        page = 0;
    }
    messageFunctions.TicketsAdmin(page).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/close-ticket", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    messageFunctions.CloseTicket(data._id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=messages.js.map