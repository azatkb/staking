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
var verificationDb = __importStar(require("../database/verification"));
var image_1 = require("../util/image");
var email_1 = require("../util/email");
exports.CreateVerificationOrder = function (userId, passport1, passport2, otherDoc) {
    return new Promise(function (resolve, reject) {
        image_1.saveImage(passport1, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (passport1Url) {
            image_1.saveImage(passport2, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (passport2Url) {
                image_1.saveImage(otherDoc, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (otherDocUrl) {
                    verificationDb.CreateVerificationOrder(userId, passport1Url, passport2Url, otherDocUrl).then(function (data) {
                        resolve(data);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject({ code: 500 });
                });
            })["catch"](function (err) {
                reject({ code: 500 });
            });
        })["catch"](function (err) {
            reject({ code: 500 });
        });
    });
};
exports.ResendVerificationOrder = function (userId, passport1, passport2, otherDoc) {
    return new Promise(function (resolve, reject) {
        image_1.saveImage(passport1, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (passport1Url) {
            image_1.saveImage(passport2, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (passport2Url) {
                image_1.saveImage(otherDoc, "passports", new mongoose_1["default"].Types.ObjectId()).then(function (otherDocUrl) {
                    verificationDb.ResendVerificationOrder(userId, passport1Url, passport2Url, otherDocUrl).then(function (data) {
                        resolve(data);
                    })["catch"](function (err) {
                        reject(err);
                    });
                })["catch"](function (err) {
                    reject({ code: 500 });
                });
            })["catch"](function (err) {
                reject({ code: 500 });
            });
        })["catch"](function (err) {
            reject({ code: 500 });
        });
    });
};
exports.GetMyOrder = function (userId) {
    return new Promise(function (resolve, reject) {
        verificationDb.GetMyOrder(userId).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetOrder = function (id) {
    return new Promise(function (resolve, reject) {
        verificationDb.GetOrder(id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.Orders = function () {
    return new Promise(function (resolve, reject) {
        verificationDb.Orders().then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.DeclineVerificationOrder = function (id, declineReasone) {
    return new Promise(function (resolve, reject) {
        verificationDb.DeclineVerificationOrder(id, declineReasone).then(function (data) {
            email_1.sendEmail(data.email, "Your verification request declined", "Reasone: " + declineReasone).then(function () {
                resolve({ code: 200 });
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.AprooveVerificationOrder = function (id) {
    return new Promise(function (resolve, reject) {
        verificationDb.AprooveVerificationOrder(id).then(function (data) {
            email_1.sendEmail(data.email, "Your verification request approved", "Your verification request approved").then(function () {
                resolve({ code: 200 });
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=verifications.js.map