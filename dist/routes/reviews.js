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
var express_1 = __importDefault(require("express"));
var auth_1 = require("../config/auth");
var reviewFunctions = __importStar(require("../functions/reviews"));
var routes = express_1["default"].Router();
routes.post("/add", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    var userId = req["token"]._id;
    if (!data.client_id_to) {
        return res.status(400).send("client_id_to parametr is required");
    }
    if (!data.order_id) {
        return res.status(400).send("order_id parametr is required");
    }
    if (!data.type) {
        return res.status(400).send("type parametr is required");
    }
    if (!data.amount_grade) {
        return res.status(400).send("amount_grade parametr is required");
    }
    if (!data.rev_text) {
        return res.status(400).send("rev_text parametr is required");
    }
    reviewFunctions.AddReview(userId, data.client_id_to, data.order_id, data.type, data.amount_grade, data.rev_text).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/reviews", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    var page = req.query.page;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    if (!page) {
        return res.status(400).send("page parametr is required");
    }
    reviewFunctions.GetUserReviews(id, page).then(function (docs) {
        return res.status(200).send(docs);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.get("/reviews-page", auth_1.isAuthenticated, function (req, res) {
    var id = req.query.id;
    if (!id) {
        return res.status(400).send("id parametr is required");
    }
    reviewFunctions.GetUserReviewsPage(id).then(function (docs) {
        // To do check user is online 
        return res.status(200).send(docs);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=reviews.js.map