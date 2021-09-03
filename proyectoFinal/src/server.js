var express = require('express');
var app = express();
var Router = express().Router;
var productos = express.Router();
var carrito = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
productos.get('/', function (req, res) {
    res.send('Productos');
});
carrito.get('/', function (req, res) {
    res.send('Carrito');
});
app.get('/', function (req, res) { });
app.use('/api/productos', productos);
app.use('/api/carrito', carrito);
app.listen(8080, function () { return console.log('Server started on 8080'); });
