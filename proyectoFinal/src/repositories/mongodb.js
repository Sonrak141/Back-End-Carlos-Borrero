"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.readUser = exports.readProduct = exports.creatUser = exports.createProduct = void 0;
var db = require('../db.js');
var ProductosModel = require('../models/producto.model.js').ProductosModel;
var UserModel = require('../models/user.model.js').UserModel;
var createTransport = require('nodemailer').createTransport;
var logger = require('../logger.js');
var transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'codertest141@gmail.com',
        pass: 'coder1234'
    }
});
var mailOptions = {
    from: 'Servidor Coder',
    to: 'codertest141@gmail.com',
    subject: 'Nuevo usuario',
    html: '<h1>Nuevo usuario se ha registrado</h1>'
};
function sendMailGmail() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, transporter.sendMail(mailOptions)];
                case 1:
                    response = _a.sent();
                    logger.log('warn', response);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.log('error', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var responseProduct, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ProductosModel.create(product)];
                case 1:
                    responseProduct = _a.sent();
                    logger.log('warn', responseProduct);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger.log('error', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createProduct = createProduct;
function creatUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var responseUser, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, UserModel.create(user)];
                case 1:
                    responseUser = _a.sent();
                    logger.log('warn', responseUser);
                    return [4 /*yield*/, sendMailGmail()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    logger.log('error', err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.creatUser = creatUser;
// createProduct();
function readProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var productos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductosModel.find()];
                case 1:
                    productos = _a.sent();
                    return [2 /*return*/, productos];
            }
        });
    });
}
exports.readProduct = readProduct;
function readUser() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel.find()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
            }
        });
    });
}
exports.readUser = readUser;
