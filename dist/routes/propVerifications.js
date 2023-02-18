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
var propVerificationFunctions = __importStar(require("../functions/propVerificationOrders"));
var routes = express_1["default"].Router();
routes.post("/send-to-review", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data.prop_id) {
        return res.status(400).send("prop_id parametr is required");
    }
    if (!data.photo_1) {
        return res.status(400).send("photo_1 parametr is required");
    }
    propVerificationFunctions.SendPropVerificationOrder(data.prop_id, data.photo_1, data.photo_2).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/resend-to-review", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.photo_1) {
        return res.status(400).send("photo_1 parametr is required");
    }
    propVerificationFunctions.ResendProperificationOrder(data._id, data.photo_1, data.photo_2).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/decline-order", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.decline_reason) {
        return res.status(400).send("decline_reason parametr is required");
    }
    propVerificationFunctions.DeclinePropVerificationOrder(data._id, data.decline_reason).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/approve-order", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    propVerificationFunctions.AprooveOrderVerificationOrder(data._id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-order", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    propVerificationFunctions.GetVerificationOrder(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-orders", auth_1.isAdmin, function (req, res) {
    propVerificationFunctions.GetOrders().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=propVerifications.js.map