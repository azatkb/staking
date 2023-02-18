"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var base64_to_image_1 = __importDefault(require("base64-to-image"));
exports.saveImage = function (baseImage, folder, name) {
    return new Promise(function (resolve, reject) {
        var dirname = path_1["default"].resolve('./');
        var ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
        var fullPath = dirname + "/public/" + folder + "/";
        var optionalObj = { fileName: name, type: ext };
        try {
            base64_to_image_1["default"](baseImage, fullPath, optionalObj);
            var minpath = folder + "/" + name + "." + ext;
            resolve(minpath);
        }
        catch (err) {
            reject(err);
        }
    });
};
//# sourceMappingURL=image.js.map