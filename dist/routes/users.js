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
var express_1 = __importDefault(require("express"));
var auth_1 = require("../config/auth");
var usersFunctions = __importStar(require("../functions/users"));
var request_ip_1 = __importDefault(require("request-ip"));
var google = require('googleapis').google;
var service_account = {
    "type": "service_account",
    "project_id": "ovpcoin",
    "private_key_id": "fb99ceae3016d1c55018c138797b9d00b22e4d26",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/kjPYdkwFWE1r\nLZZpx4+vWKC9FLFKyNTBWFWpsg4372VJbPbaP2z5D7VLIJQxAETUk15+RUge/WQd\nioiXxWgezuvHjroEZ07oIW8VjONbbovZ5Q8ntXQDxVdhdqtgMaTd6bfTLdlhh+1P\nS13wCF2EuuJJpeG9MkRlqFjVeBW5zrODlpRS9mp/eccI0PYJhBCmPWiX6vPv1bhN\nIxvGKmHWpPM6I0VhlzUXVD3ybQEal/vGY5h5XlRyqpvg73rT/KD8PoQOnjA4vsF1\nrIlMneGAm+pf9hetxup52DyRTEuw5C38icHFSAdiU2EDe9eZdq3BPLoT+c1vKiSX\n8SDD0Ye5AgMBAAECggEAA6D37pyrtc81ejdXxHharP+LXew01oiQL9Bl9lawhRfk\nYzFsn0zjxM0AH2SbggPHX1UiTVcvyvcm92tJc+yHRiF1HxIsTQs4QqvoIDBLbzmH\nGHvJtMlvtubnpT7mTKZsFnsH984EHTWXWxuU84geXgux384ZWlLdL6Vyd1VfaKYC\nDG5I2ZWXZgBR7GjlQYe6QbW8zlqdEQwQs4Lu+82lClmUcGWhqLP5aVoXIMYl8A8U\n+P3JPWsWx5grPlTYIK9KpOMcQdSxSesYe0IA7S/1d63XbSdwyacuW6zQWOc85mRu\nAuMIkt8lCHdCYleALrBDvG1YEL0yFvkjGjy5GTqEDQKBgQDrmCUsfoBNP3cuhBms\n5aKyeKc9CtvRK4kIcUPMJazPPthp79UKczrRyunQPjFUa6z6vjQCsYvXJ8IGHBVZ\nJpasoXOWIvkSM9n2dQicys34YV6dApbC3UMmzFwQAxffPTT9HfMnhVAskPz1pu9K\nCGz8h3TpY0MmenKABjbC0aWytQKBgQDQKe0uL2osqasA/PorKxEiN2rciMMpXfAL\ndFvDb+Zy0dLwKZavt8Wnm+lgNSoNC+rXxg629NRswexHX1dhwMPNCJ1cOUuyrZFh\nz52UPdpuGljLCYEYEIi2FHRZtNXloOXgDa6m6teEAyoUWhS8i3a6NUdg53HCgKPD\nAxRlns1PdQKBgBY+q2PkHeEtWOd/eZ0loZMQaVoOKGs7nRi6+RfRhtuap3x5NLhj\n4O3mJuWOucGq2Q5j3y1R7k5GZr+E708XoapzJCLM8o+RbccjjcigLYqCRxi0IeAM\nXEbRjO/GGv7tHI+5wDe/Eq7ikb/wHy/yU7gUYimXQcPkU+Nastj6SpbxAoGAaARL\nTETNHTw7AudmaqO+kAZ5E3ITc1xJUq/2GpaT5NQMP43Iik2eKr6xwy1Nse8+jkud\nlraIX0AXvSJbG7GjJZUkbK0EsmgguWtxJl4yA8qOjAZXx5qbdcCK0ziVmYTo2Sh9\nGVNIFeMu57SLoBtgXHO7EyUTp0l4iz3Ct3S+yvECgYEAo+eTXBpKMqvchdHLJdI7\nM4DrPhmMTSIWJYGIPtHkyH8yzPPZOIhnd65a8Lz5NO1sXR2r7vOJSxugWTQ8NZJW\nzaFJ3LKibhGwDBIgUVgZvzhqpex7DTuZ3oqXjXS1SE2DwkWqBY50UPCKnT7DYP8t\nEWnmBtIN8dDu3LFwSDeshxY=\n-----END PRIVATE KEY-----\n",
    "client_email": "ovpcoincred@ovpcoin.iam.gserviceaccount.com",
    "client_id": "107780261213225685483",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ovpcoincred%40ovpcoin.iam.gserviceaccount.com"
};
var gAnalytics = google.analytics('v3');
var scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
var routes = express_1["default"].Router();
routes.get("/statistics", auth_1.isAuthenticated, function (req, res) {
    var start = req.query.start;
    var end = req.query.end;
    if (!start) {
        return res.status(400).send("start parametr is required");
    }
    if (!end) {
        return res.status(400).send("end parametr is required");
    }
    var jwt = new google.auth.JWT(service_account.client_email, null, service_account.private_key, scopes);
    var params = {
        'auth': jwt,
        'ids': 'ga:270545190',
        'metrics': 'ga:users,ga:sessions',
        'start-date': start,
        'end-date': end,
        'dimensions': 'ga:date'
    };
    gAnalytics.data.ga.get(params, function (err, data) {
        if (!err) {
            return res.status(200).send(data.data.rows);
        }
        else {
            console.log(err);
            return res.status(400).send(err);
        }
    });
});
routes.post("/register", function (req, res) {
    var ip = request_ip_1["default"].getClientIp(req);
    var data = req.body;
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    if (!data.password) {
        return res.status(400).send("password parametr is required");
    }
    data["ip"] = ip;
    usersFunctions.Register(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/login", function (req, res) {
    var data = req.body;
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    if (!data.password) {
        return res.status(400).send("password parametr is required");
    }
    usersFunctions.Login(data).then(function (msg) {
        return res.status(msg.code ? msg.code : 200).send(msg);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 404).send(err);
    });
});
routes.post("/update-user", auth_1.isAuthenticated, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    usersFunctions.UpdateProfile(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/user-profile", auth_1.isAuthenticated, function (req, res) {
    var userId = req["token"]._id;
    usersFunctions.GetProfile(userId).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/change-password", auth_1.isAuthenticated, function (req, res) {
    var userId = req["token"]._id;
    var data = req.body;
    if (!data.password) {
        return res.status(400).send("password parametr is required");
    }
    if (!data.new_password) {
        return res.status(400).send("new_password parametr is required");
    }
    usersFunctions.ChangePassword(userId, data.password, data.new_password).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/reset-password", function (req, res) {
    var data = req.body;
    if (!data.password) {
        return res.status(400).send("password parametr is required");
    }
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    usersFunctions.ResetPassword(data._id, data.password).then(function (response) {
        return res.status(200).send(response);
    })["catch"](function (err) {
        return res.status(400).send(err);
    });
});
routes.post("/reset", function (req, res) {
    var data = req.body;
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    usersFunctions.CreateResetLink(data.email).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(404).send(err);
    });
});
routes.get("/check-reset", function (req, res) {
    var _id = req.query.id;
    if (!_id) {
        return res.status(400).send("id parametr is required");
    }
    usersFunctions.CheckResetLink(_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(404).send(err);
    });
});
routes.get("/users", auth_1.isAdmin, function (req, res) {
    var role = req.query.role;
    if (!role) {
        return res.status(400).send("role parametr is required");
    }
    var page = req.query.page;
    if (!page) {
        page = 0;
    }
    usersFunctions.Users(role, page).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(404).send(err);
    });
});
routes.get("/user", auth_1.isAdmin, function (req, res) {
    var id = req.query.id;
    usersFunctions.GetInfo(id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(404).send(err);
    });
});
routes.post("/update-user-admin", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.email) {
        return res.status(400).send("email parametr is required");
    }
    if (!data.role) {
        return res.status(400).send("role parametr is required");
    }
    usersFunctions.UpdateProfileAdmin(data).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.post("/change-password-admin", auth_1.isAdmin, function (req, res) {
    var data = req.body;
    if (!data._id) {
        return res.status(400).send("_id parametr is required");
    }
    if (!data.password) {
        return res.status(400).send("password parametr is required");
    }
    usersFunctions.ChangePasswordAdmin(data._id, data.password).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(err.code ? err.code : 403).send(err);
    });
});
routes.get("/get-permisssions", auth_1.isAdmin, function (req, res) {
    var user_id = req["token"]._id;
    usersFunctions.GetPermissions(user_id).then(function (doc) {
        return res.status(200).send(doc);
    })["catch"](function (err) {
        return res.status(404).send(err);
    });
});
exports["default"] = routes;
//# sourceMappingURL=users.js.map