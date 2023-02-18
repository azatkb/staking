"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var citiesDb = __importStar(require("../database/cities"));
exports.AddCity = function (code, name) {
    return new Promise(function (resolve, reject) {
        citiesDb.AddCity(code, name).then(function (doc) {
            resolve(doc);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateCity = function (_id, code, name) {
    return new Promise(function (resolve, reject) {
        citiesDb.UpdateCity(_id, code, name).then(function (doc) {
            resolve(doc);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetAllCurrenies = function () {
    return new Promise(function (resolve, reject) {
        citiesDb.GetAllCities().then(function (docs) {
            resolve(docs);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=cities.js.map