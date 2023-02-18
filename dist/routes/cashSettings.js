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
var cashSettingsFunctions = __importStar(require("../functions/cashSettings"));
var routes = express_1["default"].Router();
routes.post("/add", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.hasOwnProperty('status')) {
        return res.status(400).send("status parametr is required");
    }
    if (!data.cash_currency) {
        return res.status(400).send("cash_currency parametr is required");
    }
    if (!data.shot_cash_cur) {
        return res.status(400).send("short_cash_cur parametr is required");
    }
    if (!data.country) {
        return res.status(400).send("country parametr is required");
    }
    if (!data.city) {
        return res.status(400).send("city parametr is required");
    }
    if (!data.logo) {
        return res.status(400).send("logo parametr is required");
    }
    if (!data.cur_estandart) {
        return res.status(400).send("cur_estandart parametr is required");
    }
    if (!data.city_estandart) {
        return res.status(400).send("city_estandart parametr is required");
    }
    cashSettingsFunctions.AddCashSetting(data.status, data.cash_currency, data.short_cash_cur, data.country, data.city, data.logo, data.cur_estandart, data.city_estandart).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/update", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.hasOwnProperty('status')) {
        return res.status(400).send("status parametr is required");
    }
    if (!data.cash_currency) {
        return res.status(400).send("cash_currency parametr is required");
    }
    if (!data.short_cash_cur) {
        return res.status(400).send("short_cash_cur parametr is required");
    }
    if (!data.country) {
        return res.status(400).send("country parametr is required");
    }
    if (!data.city) {
        return res.status(400).send("city parametr is required");
    }
    if (!data.logo) {
        return res.status(400).send("logo parametr is required");
    }
    if (!data.cur_estandart) {
        return res.status(400).send("cur_estandart parametr is required");
    }
    if (!data.city_estandart) {
        return res.status(400).send("cur_estandart parametr is required");
    }
    cashSettingsFunctions.UpdateCashSetting(data._id, data.status, data.cash_currency, data.short_cash_cur, data.country, data.city, data.logo, data.cur_estandart, data.city_estandart).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get", auth_1.isAuthenticated, function (req, res) {
    cashSettingsFunctions.GetCashSettings().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/get-all", auth_1.isAdmin, function (req, res) {
    cashSettingsFunctions.GetAllCashSettings().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=cashSettings.js.map