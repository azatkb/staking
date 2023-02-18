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
var propsFunctions = __importStar(require("../functions/props"));
var routes = express_1["default"].Router();
routes.post("/add-prop", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.prop_type_id) {
        return res.status(400).send("prop_type_id parametr is required");
    }
    if (!data.currency_prop) {
        return res.status(400).send("currency_prop parametr is required");
    }
    if (!data.payment_system_prop) {
        return res.status(400).send("payment_system_prop parametr is required");
    }
    if (!data.prop_num) {
        return res.status(400).send("regular_check parametr is required");
    }
    propsFunctions.AddProp(userId, data.prop_type_id, data.currency_prop, data.payment_system_prop, data.prop_num).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/update-prop", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.prop_type_id) {
        return res.status(400).send("prop_type_id parametr is required");
    }
    if (!data.currency_prop) {
        return res.status(400).send("currency_prop parametr is required");
    }
    if (!data.payment_system_prop) {
        return res.status(400).send("payment_system_prop parametr is required");
    }
    if (!data.prop_num) {
        return res.status(400).send("regular_check parametr is required");
    }
    propsFunctions.UpdateProp(data._id, data.prop_type_id, data.currency_prop, data.payment_system_prop, data.prop_num).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/delete-prop", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    propsFunctions.DeleteProp(data._id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-prop", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    propsFunctions.GetProp(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-props", auth_1.isAuthenticated, function (req, res) {
    var userId = req["token"]._id;
    propsFunctions.GetProps(userId).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=props.js.map