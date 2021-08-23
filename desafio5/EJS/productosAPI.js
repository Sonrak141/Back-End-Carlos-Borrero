var productsListMaker = require('./class/class.js');
var express = require('express');
var Router = express.Router;
var app = express();
var api = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var data1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
};
var prod = new productsListMaker('./productos.txt');
prod.save(data1);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/files/index.html');
});
var view = [];
prod.read().then(function (data) { return data.map(function (obj) {
    view.push(obj);
    api.get('/', function (req, res, next) {
        res.send(view);
    });
}); });
api.get('/:num', function (req, res) {
    var num = req.params.num;
    var product = {};
    var idNum = parseInt(num);
    prod.getById(idNum).then(function (data) { return res.send(data); });
});
api.post('/', function (req, res) {
    prod.save(req.body).then(function (data) { return res.send(data); });
});
api.put('/:id', function (req, res) {
    var id = req.params.id;
    prod.updateById(id, req.body).then(function (data) { return res.send(data); });
});
api["delete"]('/:id', function (req, res) {
    var id = req.params.id;
    prod.deleteById(id).then(function (data) { return res.send(data); });
});
app.use('/api/productos', api);
var PORT = 8082;
var server = app.listen(PORT, function () {
    console.log('Servidor productos Api corriendo');
});
