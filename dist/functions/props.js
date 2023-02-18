"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var propsDb = __importStar(require("../database/props"));
exports.AddProp = function (user_id, prop_type_id, currency_prop, payment_system_prop, prop_num) {
    return new Promise(function (resolve, reject) {
        propsDb.AddProp(user_id, prop_type_id, currency_prop, payment_system_prop, prop_num).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateProp = function (_id, prop_type_id, currency_prop, payment_system_prop, prop_num) {
    return new Promise(function (resolve, reject) {
        propsDb.UpdateProp(_id, prop_type_id, currency_prop, payment_system_prop, prop_num).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetProp = function (_id) {
    return new Promise(function (resolve, reject) {
        propsDb.GetProp(_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetProps = function (user_id) {
    return new Promise(function (resolve, reject) {
        propsDb.GetProps(user_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.DeleteProp = function (_id) {
    return new Promise(function (resolve, reject) {
        propsDb.DeleteProp(_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=props.js.map