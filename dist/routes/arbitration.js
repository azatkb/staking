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
var arbitrationFunctions = __importStar(require("../functions/arbitration"));
var routes = express_1["default"].Router();
routes.post("/send-request", auth_1.isAuthenticated, function (req, res) {
    var user_id = req["token"]["_id"];
    var data = req.body;
    if (!data.text) {
        return res.status(400).send("category parametr is required");
    }
    arbitrationFunctions.SendRequest(user_id, data.text).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/set-operator", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.user_id) {
        return res.status(400).send("user_id parametr is required");
    }
    arbitrationFunctions.SetOperator(data._id, data.user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/set-status", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.hasOwnProperty("status")) {
        return res.status(400).send("status parametr is required");
    }
    arbitrationFunctions.SetStatus(data._id, data.status).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/requests", auth_1.isAuthenticated, function (req, res) {
    arbitrationFunctions.GetRequests().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=arbitration.js.map