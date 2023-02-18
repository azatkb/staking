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
var systemAccauntFunctions = __importStar(require("../functions/systemAccaunt"));
var routes = express_1["default"].Router();
routes.post("/create", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data.sys_account_num) {
        return res.status(400).send("sys_account_num parametr is required");
    }
    if (!data.currency) {
        return res.status(400).send("currency parametr is required");
    }
    if (!data.payment_system) {
        return res.status(400).send("payment_system parametr is required");
    }
    if (!data.short_name) {
        return res.status(400).send("short_name parametr is required");
    }
    if (!data.service_comission_in) {
        return res.status(400).send("service_comission_in parametr is required");
    }
    if (!data.pay_comission_in) {
        return res.status(400).send("pay_comission_in parametr is required");
    }
    if (!data.pay_fix_comission_in) {
        return res.status(400).send("pay_fix_comission_in parametr is required");
    }
    if (!data.service_comission_out) {
        return res.status(400).send("service_comission_out parametr is required");
    }
    if (!data.pay_comission_out) {
        return res.status(400).send("pay_comission_out parametr is required");
    }
    systemAccauntFunctions.CreateAccaunt(data.sys_account_num, data.currency, data.payment_system, data.short_name, data.service_comission_in, data.pay_comission_in, data.pay_fix_comission_in, data.service_comission_out, data.pay_comission_out).then(function (doc) {
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
    if (!data.sys_account_num) {
        return res.status(400).send("sys_account_num parametr is required");
    }
    if (!data.currency) {
        return res.status(400).send("currency parametr is required");
    }
    if (!data.short_name) {
        return res.status(400).send("short_name parametr is required");
    }
    if (!data.service_comission_in) {
        return res.status(400).send("service_comission_in parametr is required");
    }
    if (!data.pay_comission_in) {
        return res.status(400).send("pay_comission_in parametr is required");
    }
    if (!data.pay_fix_comission_in) {
        return res.status(400).send("pay_fix_comission_in parametr is required");
    }
    if (!data.service_comission_out) {
        return res.status(400).send("service_comission_out parametr is required");
    }
    if (!data.pay_comission_out) {
        return res.status(400).send("pay_comission_out parametr is required");
    }
    systemAccauntFunctions.UpdateAccaunt(data._id, data.sys_account_num, data.currency, data.short_name, data.service_comission_in, data.pay_comission_in, data.pay_fix_comission_in, data.service_comission_out, data.pay_comission_out).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/list", auth_1.isAdmin, function (req, res) {
    systemAccauntFunctions.List().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/balance", auth_1.isAdmin, function (req, res) {
    systemAccauntFunctions.Balance().then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=systemAccount.js.map