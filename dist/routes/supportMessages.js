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
var supportMessagesFunctions = __importStar(require("../functions/supportMesages"));
var request_ip_1 = __importDefault(require("request-ip"));
var routes = express_1["default"].Router();
routes.post("/send", function (req, res) {
    var ip = request_ip_1["default"].getClientIp(req);
    var data = req.body;
    if (!data.category) {
        return res.status(400).send("category parametr is required");
    }
    if (!data.text) {
        return res.status(400).send("text parametr is required");
    }
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    supportMessagesFunctions.SendSupportMessage(data.category, data.text, data.email, ip).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/answer", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.text) {
        return res.status(400).send("text parametr is required");
    }
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    supportMessagesFunctions.AnswerSupportMessage(data._id, data.text).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/messages", auth_1.isAdmin, function (req, res) {
    var page = req.query.page ? parseInt(req.query.page) : 0;
    supportMessagesFunctions.GetSupportMessages(page).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=supportMessages.js.map