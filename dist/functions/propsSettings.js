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
var mongoose_1 = __importDefault(require("mongoose"));
var propSettingsDb = __importStar(require("../database/propSettings"));
var image_1 = require("../util/image");
exports.AddPropSetings = function (curency_prop, payment_system_prop, payment_sys_short_name, regular_check, logo, estandart, to_verif, status) {
    return new Promise(function (resolve, reject) {
        image_1.saveImage(logo, "props", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
            propSettingsDb.AddPropSetings(curency_prop, payment_system_prop, payment_sys_short_name, regular_check, path, estandart, to_verif, status).then(function (data) {
                resolve(data);
            })["catch"](function (err) {
                reject(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdatePropSetings = function (_id, curency_prop, payment_system_prop, payment_sys_short_name, regular_check, logo, estandart, to_verif, status) {
    return new Promise(function (resolve, reject) {
        if (logo.indexOf("base64") > (-1)) {
            image_1.saveImage(logo, "props", new mongoose_1["default"].Types.ObjectId()).then(function (path) {
                propSettingsDb.UpdatePropSetings(_id, curency_prop, payment_system_prop, payment_sys_short_name, regular_check, path, estandart, to_verif, status).then(function (data) {
                    resolve(data);
                })["catch"](function (err) {
                    reject(err);
                });
            })["catch"](function (err) {
                reject(err);
            });
        }
        else {
            propSettingsDb.UpdatePropSetings(_id, curency_prop, payment_system_prop, payment_sys_short_name, regular_check, logo, estandart, to_verif, status).then(function (data) {
                resolve(data);
            })["catch"](function (err) {
                reject(err);
            });
        }
    });
};
exports.GetPropSetting = function (_id) {
    return new Promise(function (resolve, reject) {
        propSettingsDb.GetPropSetting(_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetPropSettings = function () {
    return new Promise(function (resolve, reject) {
        propSettingsDb.GetPropSettings().then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=propsSettings.js.map