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
var verificationFunctions = __importStar(require("../functions/verifications"));
var routes = express_1["default"].Router();
routes.post("/send-to-review", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.passport1) {
        return res.status(400).send("passport1 parametr is required");
    }
    if (!data.passport2) {
        return res.status(400).send("passport2 parametr is required");
    }
    if (!data.other_doc) {
        return res.status(400).send("other_doc parametr is required");
    }
    verificationFunctions.CreateVerificationOrder(userId, data.passport1, data.passport2, data.other_doc).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/resend-to-review", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.passport1) {
        return res.status(400).send("passport1 parametr is required");
    }
    if (!data.passport2) {
        return res.status(400).send("passport2 parametr is required");
    }
    if (!data.other_doc) {
        return res.status(400).send("other_doc parametr is required");
    }
    verificationFunctions.ResendVerificationOrder(userId, data.passport1, data.passport2, data.other_doc).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-my-order", auth_1.isAuthenticated, function (req, res) {
    var id = req["token"]._id;
    verificationFunctions.GetMyOrder(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-order", auth_1.isAdmin, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    verificationFunctions.GetOrder(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/orders", auth_1.isAdmin, function (req, res) {
    verificationFunctions.Orders().then(function (docs) {
        return res.status(200).send(docs);
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
    verificationFunctions.DeclineVerificationOrder(data._id, data.decline_reason).then(function (doc) {
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
    verificationFunctions.AprooveVerificationOrder(data._id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=verifications.js.map