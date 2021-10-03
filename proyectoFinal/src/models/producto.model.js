"use strict";
exports.__esModule = true;
exports.ProductosModel = void 0;
var mongoose = require('mongoose');
var ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});
exports.ProductosModel = mongoose.model('Productos', ProductosSchema);
