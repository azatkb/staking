"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Review_1 = __importDefault(require("../models/Review"));
var User_1 = __importDefault(require("../models/User"));
var ClientOrder_1 = __importDefault(require("../models/ClientOrder"));
var BlackListItem_1 = __importDefault(require("../models/BlackListItem"));
var Rating_1 = __importDefault(require("../models/Rating"));
var constants_1 = require("../util/constants");
exports.AddReview = function (client_id_from, client_id_to, order_id, type, amount_grade, rev_text) {
    return new Promise(function (resolve, reject) {
        var review = new Review_1["default"]({
            client_id_from: new mongoose_1["default"].Types.ObjectId(client_id_from),
            client_id_to: new mongoose_1["default"].Types.ObjectId(client_id_to),
            order_id: new mongoose_1["default"].Types.ObjectId(order_id),
            type: type,
            amount_grade: amount_grade,
            rev_text: rev_text
        });
        review.save(function (err, doc) {
            if (!err) {
                Rating_1["default"].findOne({ user_id: new mongoose_1["default"].Types.ObjectId(client_id_to) }, function (err, ratingDoc) {
                    if (!err) {
                        var total = ratingDoc.total;
                        var bad = ratingDoc.bad;
                        var good = ratingDoc.total;
                        total++;
                        if (type === constants_1.ReviewType.good) {
                            good++;
                        }
                        else if (type === constants_1.ReviewType.bad) {
                            bad++;
                        }
                        var percent = (good / total) * 100;
                        var rating = (percent / 100) * 5;
                        Rating_1["default"].updateOne({ _id: ratingDoc._id }, { $set: { total: total, bad: bad, good: good, rating: rating } }, function (err, saved) {
                            if (!err) {
                                resolve({ code: 200 });
                            }
                            else {
                                reject(err);
                            }
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetOpenOrders = function (user_id) {
    return new Promise(function (resolve, reject) {
        ClientOrder_1["default"].countDocuments({ client_id_from: new mongoose_1["default"].Types.ObjectId(user_id), order_status: constants_1.OrderStatuses.active })
            .exec(function (err, count) {
            if (!err) {
                resolve({ count: count });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetUserReviews = function (user_id, page) {
    return new Promise(function (resolve, reject) {
        Review_1["default"].find({ client_id_to: new mongoose_1["default"].Types.ObjectId(user_id) })
            .skip(page * 5)
            .limit(5)
            .populate('client_id_from')
            .exec(function (err, reviews) {
            if (!err) {
                var result_1 = [];
                reviews.forEach(function (review) {
                    var user = review['client_id_from'];
                    var revviewObj = {
                        _id: review._id,
                        user: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            photo: user.photo,
                            verif_status: user.verif_status
                        },
                        type: review.type,
                        amount_grade: review.amount_grade,
                        rev_text: review.rev_text,
                        createdAt: review.createdAt
                    };
                    result_1.push(revviewObj);
                });
                resolve(result_1);
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetProfile = function (userId) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            updatedAt: false,
            password: false,
            email_confirmed: false,
            reg_ip: false,
            login_ip: false,
            passport_num: false,
            "2FA": false,
            allow_all_ip: false,
            show_requisites: false
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
exports.GetUserBlackList = function (user_id) {
    return new Promise(function (resolve, reject) {
        BlackListItem_1["default"].countDocuments({ user_id: new mongoose_1["default"].Types.ObjectId(user_id) })
            .exec(function (err, count) {
            if (!err) {
                resolve({ count: count });
            }
            else {
                reject(err);
            }
        });
    });
};
exports.GetUserReviewsPage = function (user_id) {
    return new Promise(function (resolve, reject) {
        exports.GetProfile(user_id).then(function (user) {
            Review_1["default"].find({ client_id_to: new mongoose_1["default"].Types.ObjectId(user_id) })
                .populate('client_id_from')
                .exec(function (err, docs) {
                if (!err) {
                    var total_1 = docs.length;
                    var goodReviews = docs.filter(function (d) { return d.type === constants_1.ReviewType.good; });
                    var bedReviews = docs.filter(function (d) { return d.type === constants_1.ReviewType.bad; });
                    var goodReviewers_1 = new Set();
                    var good_verified_reviewers_count_1 = 0;
                    var good_not_verified_reviewers_count_1 = 0;
                    goodReviews.forEach(function (review) {
                        if (!goodReviewers_1.has(review.client_id_from.toString())) {
                            goodReviewers_1.add(review.client_id_from.toString());
                            var user_1 = review['client_id_from'];
                            if (user_1.verif_status == constants_1.VerifyStatus.verfied) {
                                good_verified_reviewers_count_1++;
                            }
                            else {
                                good_not_verified_reviewers_count_1++;
                            }
                        }
                    });
                    var good_reviews_count_1 = goodReviews.length;
                    var good_reviewers_count_1 = goodReviewers_1.size;
                    var badReviewers_1 = new Set();
                    var bad_verified_reviewers_count_1 = 0;
                    var bad_not_verified_reviewers_count_1 = 0;
                    bedReviews.forEach(function (review) {
                        if (!badReviewers_1.has(review.client_id_from.toString())) {
                            badReviewers_1.add(review.client_id_from.toString());
                            var user_2 = review['client_id_from'];
                            if (user_2.verif_status === constants_1.VerifyStatus.verfied) {
                                bad_verified_reviewers_count_1++;
                            }
                            else {
                                bad_not_verified_reviewers_count_1++;
                            }
                        }
                    });
                    var bad_reviews_count_1 = bedReviews.length;
                    var bad_reviewers_count_1 = badReviewers_1.size;
                    var percent = (goodReviews.length / total_1) * 100;
                    var rate_1 = (percent / 100) * 5;
                    exports.GetUserReviews(user_id, 0).then(function (reviews) {
                        exports.GetUserBlackList(user_id).then(function (black_list) {
                            exports.GetOpenOrders(user_id).then(function (open_orders) {
                                var response = {
                                    user: user,
                                    open_orders: open_orders,
                                    black_list: black_list,
                                    raviews_data: {
                                        rate: rate_1,
                                        total: total_1,
                                        good_reviews_count: good_reviews_count_1,
                                        good_reviewers_count: good_reviewers_count_1,
                                        good_verified_reviewers_count: good_verified_reviewers_count_1,
                                        good_not_verified_reviewers_count: good_not_verified_reviewers_count_1,
                                        bad_reviews_count: bad_reviews_count_1,
                                        bad_reviewers_count: bad_reviewers_count_1,
                                        bad_verified_reviewers_count: bad_verified_reviewers_count_1,
                                        bad_not_verified_reviewers_count: bad_not_verified_reviewers_count_1
                                    },
                                    reviews: reviews
                                };
                                resolve(response);
                            })["catch"](function (err) {
                                reject(err);
                            });
                        })["catch"](function (err) {
                            reject(err);
                        });
                    })["catch"](function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(err);
                }
            });
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=reviews.js.map