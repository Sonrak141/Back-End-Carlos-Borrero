var productsListMaker = require('./class/class.js');
var express = require('express');
var Router = express.Router;
var router = new Router();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var data1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
};
var prod = new productsListMaker('./API_RESTful/productos.txt');
prod.save(data1);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/files/index.html');
});
var view = [];
prod.read().then(function (data) { return data.map(function (obj) {
    view.push(obj);
    app.get('/api/productos', function (req, res, next) {
        res.send(view);
    });
}); });
app.use('/api/productos', router);
var PORT = 8082;
var server = app.listen(PORT, function () {
    console.log('Servidor productos Api corriendo');
});
