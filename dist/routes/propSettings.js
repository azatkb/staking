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
var propsSettingsFunctions = __importStar(require("../functions/propsSettings"));
var routes = express_1["default"].Router();
routes.post("/add-prop-settings", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.curency_prop) {
        return res.status(400).send("curency_prop parametr is required");
    }
    if (!data.payment_system_prop) {
        return res.status(400).send("payment_system_prop parametr is required");
    }
    if (!data.payment_sys_short_name) {
        return res.status(400).send("payment_sys_short_name parametr is required");
    }
    if (!data.regular_check) {
        return res.status(400).send("regular_check parametr is required");
    }
    if (!data.logo) {
        return res.status(400).send("logo parametr is required");
    }
    if (!data.estandart) {
        return res.status(400).send("estandart parametr is required");
    }
    if (!data.hasOwnProperty('to_verif')) {
        return res.status(400).send("to_verif parametr is required");
    }
    if (!data.hasOwnProperty('status')) {
        return res.status(400).send("status parametr is required");
    }
    propsSettingsFunctions.AddPropSetings(data.curency_prop, data.payment_system_prop, data.payment_sys_short_name, data.regular_check, data.logo, data.estandart, data.to_verif, data.status).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/update-prop-settings", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.curency_prop) {
        return res.status(400).send("curency_prop parametr is required");
    }
    if (!data.payment_system_prop) {
        return res.status(400).send("payment_system_prop parametr is required");
    }
    if (!data.payment_sys_short_name) {
        return res.status(400).send("payment_sys_short_name parametr is required");
    }
    if (!data.regular_check) {
        return res.status(400).send("regular_check parametr is required");
    }
    if (!data.logo) {
        return res.status(400).send("logo parametr is required");
    }
    if (!data.estandart) {
        return res.status(400).send("estandart parametr is required");
    }
    if (!data.hasOwnProperty('to_verif')) {
        return res.status(400).send("to_verif parametr is required");
    }
    if (!data.hasOwnProperty('status')) {
        return res.status(400).send("status parametr is required");
    }
    propsSettingsFunctions.UpdatePropSetings(data._id, data.curency_prop, data.payment_system_prop, data.payment_sys_short_name, data.regular_check, data.logo, data.estandart, data.to_verif, data.status).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-prop-settings", auth_1.isAdmin, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    propsSettingsFunctions.GetPropSetting(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-props-settings", auth_1.isAuthenticated, function (req, res) {
    propsSettingsFunctions.GetPropSettings().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=propSettings.js.map