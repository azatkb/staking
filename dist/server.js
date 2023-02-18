"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var server = app_1.app.listen(app_1.app.get("port"), function () {
    console.log("App is running at http://localhost:%d in %s mode", app_1.app.get("port"), app_1.app.get("env"));
});
exports["default"] = server;
//# sourceMappingURL=server.js.map