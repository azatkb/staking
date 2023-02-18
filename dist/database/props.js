"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Prop_1 = __importDefault(require("../models/Prop"));
exports.AddProp = function (user_id, prop_type_id, currency_prop, payment_system_prop, prop_num) {
    return new Promise(function (resolve, reject) {
        var prop = new Prop_1["default"]({
            user_id: new mongoose_1["default"].Types.ObjectId(user_id),
            prop_type_id: new mongoose_1["default"].Types.ObjectId(prop_type_id),
            currency_prop: currency_prop,
            payment_system_prop: payment_system_prop,
            prop_num: prop_num,
            verif_pop: false
        });
        prop.save(function (err, doc) {
            if (!err) {
                resolve(doc);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.UpdateProp = function (_id, prop_type_id, currency_prop, payment_system_prop, prop_num) {
    return new Promise(function (resolve, reject) {
        Prop_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, {
            $set: {
                prop_type_id: new mongoose_1["default"].Types.ObjectId(prop_type_id),
                currency_prop: currency_prop,
                payment_system_prop: payment_system_prop,
                prop_num: prop_num
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
exports.GetProp = function (_id) {
    return new Promise(function (resolve, reject) {
        Prop_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetProps = function (user_id) {
    return new Promise(function (resolve, reject) {
        Prop_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, docs) {
            if (docs.length) {
                resolve(docs);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.DeleteProp = function (_id) {
    return new Promise(function (resolve, reject) {
        Prop_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
//# sourceMappingURL=props.js.map