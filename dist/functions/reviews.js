"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var reviewsDb = __importStar(require("../database/reviews"));
exports.AddReview = function (client_id_from, client_id_to, order_id, type, amount_grade, rev_text) {
    return new Promise(function (resolve, reject) {
        reviewsDb.AddReview(client_id_from, client_id_to, order_id, type, amount_grade, rev_text).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetUserReviews = function (user_id, page) {
    return new Promise(function (resolve, reject) {
        reviewsDb.GetUserReviews(user_id, page).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
exports.GetUserReviewsPage = function (user_id) {
    return new Promise(function (resolve, reject) {
        reviewsDb.GetUserReviewsPage(user_id).then(function (data) {
            resolve(data);
        })["catch"](function (err) {
            reject(err);
        });
    });
};
//# sourceMappingURL=reviews.js.map