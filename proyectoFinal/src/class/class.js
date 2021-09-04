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
var fs = require("fs");
var productsList = /** @class */ (function () {
    function productsList(archivo) {
        var _this = this;
        this.stringifiar = function (array) { return JSON.stringify(array, null, 2); }; // Método para stringifiar el Array y evitar la repetición del código.
        this.saveList = function (nuevaLista) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.writeFile(this.archivo, nuevaLista)];
                    case 1:
                        _a.sent(); // Guardar archivo JSON.
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateById = function (id, newProduct) { return __awaiter(_this, void 0, void 0, function () {
            var lista, index, producto, nombre, precio, foto, codigo, descripcion, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        lista = this.data;
                        index = lista.findIndex(function (product) { return product.id == id; });
                        producto = lista[index];
                        if (!producto) return [3 /*break*/, 3];
                        nombre = newProduct.nombre, precio = newProduct.precio, foto = newProduct.foto, codigo = newProduct.codigo, descripcion = newProduct.descripcion, timestamp = newProduct.timestamp;
                        // Actualizar los datos:
                        producto.product.nombre = nombre;
                        producto.product.precio = precio;
                        producto.product.foto = foto;
                        producto.product.codigo = codigo;
                        producto.product.descripcion = descripcion;
                        producto.product.timestamp = timestamp;
                        // Insertar el producto modificado en la lista:
                        lista[index] = producto;
                        return [4 /*yield*/, this.saveList(lista)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, producto];
                    case 3: return [2 /*return*/, null];
                }
            });
        }); };
        this.archivo = archivo;
        this.id = 0;
        this.data = [];
    }
    productsList.prototype.save = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        this.id++;
                        this.data.push({
                            id: this.id,
                            product: obj
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.archivo, JSON.stringify(this.data))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    productsList.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        obj = {};
                        this.data.map(function (product) {
                            if (product.id === id)
                                obj = product;
                        });
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    productsList.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readFile(this.archivo, "utf-8")];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.data = JSON.parse(data);
                            this.data.map(function (product) {
                                if (_this.id < product.id)
                                    _this.id = product.id;
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    productsList.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var objI, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        objI = 0;
                        this.data.map(function (product) {
                            if (product.id === id)
                                objI = _this.data.indexOf(product);
                        });
                        this.data.splice(objI, 1);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.archivo, JSON.stringify(this.data))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    productsList.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = [];
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        this.data.map(function (obj) {
                            list.push(obj);
                        });
                        return [2 /*return*/, list];
                }
            });
        });
    };
    return productsList;
}());
module.exports = productsList;
