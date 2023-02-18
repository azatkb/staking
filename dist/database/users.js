"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetPermissions = exports.ResetPasswordAdmin = exports.UpdateProfileAdmin = exports.GetInfo = exports.ResetPassword = exports.ChangePassword = exports.GetUserById = exports.GetProfile = exports.UpdateProfile = exports.Login = exports.Register = exports.CheckResetLink = exports.CreateResetLink = exports.Users = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = __importDefault(require("../models/User"));
var Reset_1 = __importDefault(require("../models/Reset"));
exports.Users = function (role, page) {
    return new Promise(function (resolve, reject) {
        User_1["default"].count({ role: role }, function (err, count) {
            User_1["default"].find({ role: role })
                // .limit(10)
                // .skip(10 * page)
                .sort({ createdAt: -1 })
                .exec(function (err, docs) {
                if (!err) {
                    resolve({
                        list: docs,
                        count: count
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    });
};
exports.CreateResetLink = function (email) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ email: email }, function (err, existingUser) {
            if (existingUser) {
                new Reset_1["default"]({ email: email })
                    .save(function (err, saved) {
                    if (!err) {
                        resolve(saved);
                    }
                    else {
                        reject({ code: 404 });
                    }
                });
            }
            else {
                reject({ code: 404 });
            }
        });
    });
};
exports.CheckResetLink = function (_id) {
    return new Promise(function (resolve, reject) {
        Reset_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, reset) {
            if (reset) {
                resolve(reset);
            }
            else {
                reject();
            }
        });
    });
};
exports.Register = function (data) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ email: data.email }, function (err, existingUser) {
            if (existingUser) {
                reject({ msg: "user with same email exists", code: 400 });
            }
            else {
                var user = new User_1["default"]({
                    email: data.email,
                    password: data.password,
                    role: "user",
                    ip: data.ip,
                    can_change_permissions: false,
                    can_transact: false,
                    can_ban: false
                });
                user.save(function (err1, savedUser) {
                    if (!err1) {
                        resolve(savedUser);
                    }
                    else {
                        reject(err);
                    }
                });
            }
        });
    });
};
exports.Login = function (data) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ email: data.email })
            .exec(function (err, user) {
            if (user) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.UpdateProfile = function (data) {
    return new Promise(function (resolve, reject) {
        User_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(data._id) }, { $set: {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday
            } }, function (err, user) {
            if (!err) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetProfile = function (userId) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false,
            createdAt: false,
            password: false
        };
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(userId) }, usersProjection, function (err, doc) {
            if (doc) {
                resolve(doc);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetUserById = function (userId) {
    return new Promise(function (resolve, reject) {
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(userId) })
            .exec(function (err, user) {
            if (!err && user) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.ChangePassword = function (userId, password) {
    return new Promise(function (resolve, reject) {
        User_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(userId) }, { $set: { password: password } }, function (err, mod) {
            if (!err) {
                resolve({ code: 200 });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.ResetPassword = function (_id, password) {
    return new Promise(function (resolve, reject) {
        Reset_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err, reset) {
            if (reset) {
                User_1["default"].updateOne({ email: reset.email }, { $set: { password: password } }, function (err, mod) {
                    if (!err) {
                        Reset_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err) {
                            resolve({ code: 200 });
                        });
                    }
                    else {
                        reject({ code: 404, msg: "not found" });
                    }
                });
            }
            else {
                reject({ code: 404 });
            }
        });
    });
};
exports.GetInfo = function (userId) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false,
            createdAt: false,
            password: false
        };
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(userId) }, usersProjection, function (err, user) {
            if (user) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.UpdateProfileAdmin = function (data) {
    return new Promise(function (resolve, reject) {
        User_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(data._id) }, { $set: {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday,
                role: data.role,
                can_change_permissions: data.can_change_permissions,
                can_transact: data.can_transact,
                can_ban: data.can_ban
            } }, function (err, user) {
            if (!err) {
                resolve(user);
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.ResetPasswordAdmin = function (_id, password) {
    return new Promise(function (resolve, reject) {
        User_1["default"].updateOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, { $set: { password: password } }, function (err, mod) {
            if (!err) {
                Reset_1["default"].deleteOne({ _id: new mongoose_1["default"].Types.ObjectId(_id) }, function (err) {
                    resolve({ code: 200 });
                });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
exports.GetPermissions = function (user_id) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false,
            createdAt: false,
            password: false
        };
        User_1["default"].findOne({ _id: new mongoose_1["default"].Types.ObjectId(user_id) }, usersProjection, function (err, user) {
            if (user) {
                resolve({ can_change_permissions: user.can_change_permissions, can_transact: user.can_transact, can_ban: user.can_ban });
            }
            else {
                reject({ code: 404, msg: "not found" });
            }
        });
    });
};
//# sourceMappingURL=users.js.map