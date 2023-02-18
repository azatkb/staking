"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetPermissions = exports.ChangePasswordAdmin = exports.GetInfo = exports.ChangePassword = exports.GetProfile = exports.UpdateProfileAdmin = exports.UpdateProfile = exports.Login = exports.Register = exports.ResetPassword = exports.Users = exports.CheckResetLink = exports.CreateResetLink = void 0;
var usersDb = __importStar(require("../database/users"));
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secrets_1 = require("../util/secrets");
var email_1 = require("../util/email");
var Transaction_1 = __importDefault(require("../models/Transaction"));
exports.CreateResetLink = function (email) {
    return new Promise(function (resolve, reject) {
        usersDb.CreateResetLink(email).then(function (saved) {
            email_1.sendEmail(email, "Reset password link", "" + secrets_1.EMAIL_CONFIRM_URL + saved._id).then(function () {
                resolve({ code: 200 });
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.CheckResetLink = function (_id) {
    return new Promise(function (resolve, reject) {
        usersDb.CheckResetLink(_id).then(function (saved) {
            resolve({ code: 200 });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
var GetBalance = function (user_id) {
    return new Promise(function (resolve, reject) {
        Transaction_1["default"].find({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) }, function (err, docs) {
            var balance = 0;
            for (var i = 0; i < docs.length; i++) {
                balance += docs[i].amount;
            }
            var fiat_purchases = docs.filter(function (doc) { return doc.type === "buy_for_fiat2"; });
            var fiat = 0;
            for (var i = 0; i < fiat_purchases.length; i++) {
                fiat += fiat_purchases[i].amount;
            }
            resolve({ balance: balance, fiat: fiat, user_id: user_id });
        });
    });
};
exports.Users = function (role, page) {
    return new Promise(function (resolve, reject) {
        usersDb.Users(role, page).then(function (data) {
            var tascks = [];
            var usersObj = data.list.map(function (user) {
                return user.toObject();
            });
            usersObj.forEach(function (user) {
                tascks.push(GetBalance(user._id.toString()));
            });
            Promise.all(tascks).then(function (balances) {
                usersObj.forEach(function (user) {
                    balances.forEach(function (balance) {
                        if (user._id.toString() === balance.user_id) {
                            user["balance"] = balance.balance;
                            user["fiat"] = balance.fiat;
                        }
                    });
                });
                resolve({ list: usersObj, count: data.count });
            })["catch"](function (err) {
                console.log(err);
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ResetPassword = function (_id, password) {
    return new Promise(function (resolve, reject) {
        bcrypt_nodejs_1["default"].genSalt(10, function (err, salt) {
            if (err) {
                reject(err);
            }
            bcrypt_nodejs_1["default"].hash(password, salt, undefined, function (err, hash) {
                if (err) {
                    reject(err);
                }
                else {
                    usersDb.ResetPassword(_id, hash).then(function (doc) {
                        resolve({ code: 200 });
                    })["catch"](function (err) {
                        reject(err);
                    });
                }
            });
        });
    });
};
exports.Register = function (user) {
    return new Promise(function (resolve, reject) {
        bcrypt_nodejs_1["default"].genSalt(10, function (err, salt) {
            if (err) {
                reject(err);
            }
            bcrypt_nodejs_1["default"].hash(user.password, salt, undefined, function (err, hash) {
                if (err) {
                    reject(err);
                }
                else {
                    // Save User
                    user.password = hash;
                    var html_1 = "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 <a href=\"https://ovpcoin.io\">OVPCoin.io</a>. \u0414\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0431\u0430\u043B\u0430\u043D\u0441\u0430 \u0438 \u0432\u0430\u043B\u044E\u0442\u043D\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 - \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u0432 \u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: <a href=\"https://ovpcoin.io/balance\">\u041F\u0435\u0440\u0435\u0439\u0442\u0438</a>. \n                    <br/>\n                    <br/>\n                    You have successfully registered on the  <a href=\"https://ovpcoin.io\">OVPCoin.io</a> platform. To check the balance and currency transactions - log in to the user's personal account: <a href=\"https://ovpcoin.io/balance\">Profile</a>";
                    usersDb.Register(user).then(function (savedUser) {
                        email_1.sendEmail(user.email, "Registration on ovpcoin.io", html_1, html_1).then(function () {
                            resolve({ code: 200 });
                        });
                    })["catch"](function (err) {
                        reject(err);
                    });
                }
            });
        });
    });
};
exports.Login = function (data) {
    return new Promise(function (resolve, reject) {
        usersDb.Login(data).then(function (user) {
            if (user.role != "banned") {
                bcrypt_nodejs_1["default"].compare(data.password, user.password, function (err, result) {
                    if (result) {
                        jsonwebtoken_1["default"].sign({ _id: user._id, email: user.email, role: user.role }, secrets_1.JWTPRIVATKEY, { expiresIn: "1d" }, function (err, token) {
                            var userObj = user.toObject();
                            delete userObj.password;
                            resolve({ token: token, profile: userObj });
                        });
                    }
                    else {
                        reject({ code: 403, msg: "Forbidden" });
                    }
                });
            }
            else {
                reject({ code: 405, msg: "Banned" });
            }
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateProfile = function (data) {
    return new Promise(function (resolve, reject) {
        usersDb.UpdateProfile(data).then(function () {
            resolve({ code: 200 });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.UpdateProfileAdmin = function (data) {
    return new Promise(function (resolve, reject) {
        usersDb.UpdateProfileAdmin(data).then(function () {
            resolve({ code: 200 });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetProfile = function (userId) {
    return new Promise(function (resolve, reject) {
        usersDb.GetProfile(userId).then(function (user) {
            resolve(user);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ChangePassword = function (userId, passowrd, newPassword) {
    return new Promise(function (resolve, reject) {
        usersDb.GetUserById(userId).then(function (user) {
            bcrypt_nodejs_1["default"].compare(passowrd, user.password, function (err, result) {
                if (result) {
                    bcrypt_nodejs_1["default"].genSalt(10, function (err, salt) {
                        if (err) {
                            reject(err);
                        }
                        bcrypt_nodejs_1["default"].hash(newPassword, salt, undefined, function (err, hash) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                usersDb.ChangePassword(userId, hash).then(function (res) {
                                    resolve(res);
                                })["catch"](function (err) {
                                    reject(err);
                                });
                            }
                        });
                    });
                }
                else {
                    reject({ code: 403, msg: "Forbidden" });
                }
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetInfo = function (userId) {
    return new Promise(function (resolve, reject) {
        usersDb.GetInfo(userId).then(function (user) {
            resolve(user);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.ChangePasswordAdmin = function (_id, passowrd) {
    return new Promise(function (resolve, reject) {
        usersDb.GetUserById(_id).then(function (user) {
            bcrypt_nodejs_1["default"].genSalt(10, function (err, salt) {
                if (err) {
                    reject(err);
                }
                bcrypt_nodejs_1["default"].hash(passowrd, salt, undefined, function (err, hash) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        usersDb.ChangePassword(_id, hash).then(function (res) {
                            resolve(res);
                        })["catch"](function (err) {
                            reject(err);
                        });
                    }
                });
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetPermissions = function (user_id) {
    return new Promise(function (resolve, reject) {
        usersDb.GetPermissions(user_id).then(function (user) {
            resolve(user);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=users.js.map