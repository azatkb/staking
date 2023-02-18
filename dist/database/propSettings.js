"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var PropSetting_1 = __importDefault(require("../models/PropSetting"));
exports.AddPropSetings = function (curency_prop, payment_system_prop, payment_sys_short_name, regular_check, logo, estandart, to_verif, status) {
    return new Promise(function (resolve, reject) {
        var propSettings = new PropSetting_1["default"]({
            curency_prop: curency_prop,
            payment_system_prop: payment_system_prop,
            payment_sys_short_name: payment_sys_short_name,
            regular_check: regular_check,
            logo: logo,
            estandart: estandart,
            to_verif: to_verif,
            status: status
        });
        propSettings.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.UpdatePropSetings = function (_id, curency_prop, payment_system_prop, payment_sys_short_name, regular_check, logo, estandart, to_verif, status) {
    return new Promise(function (resolve, reject) {
        PropSetting_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, {
            $set: {
                curency_prop: curency_prop,
                payment_system_prop: payment_system_prop,
                payment_sys_short_name: payment_sys_short_name,
                regular_check: regular_check,
                logo: logo,
                estandart: estandart,
                to_verif: to_verif,
                status: status
            }
        })
            .exec(function (err) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetPropSetting = function (_id) {
    return new Promise(function (resolve, reject) {
        PropSetting_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetPropSettings = function () {
    return new Promise(function (resolve, reject) {
        PropSetting_1["default"].find({}, function (err, docs) {
            if (docs.length) {
                resolve(docs);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
//# sourceMappingURL=propSettings.js.map