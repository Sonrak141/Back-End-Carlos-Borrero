var express = require('express');
var emoji = require('node-emoji');
var HttpServer = require('http').Server;
var IOServer = require('socket.io').Server;
var app = express();
var httpServer = new HttpServer(app);
var io = new IOServer(httpServer);
io.on('connection', function (socket) {
    console.log(emoji.get('pizza'), 'Usuario Conectado');
    socket.emit('connectionMessage', 'Bienvenidos a el Socket');
    socket.on('disconnect', function () {
        console.log(emoji.get('fire'), 'Usuario Desconectado');
    });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + './public/index.html');
});
httpServer.listen(8080, function () { return console.log(emoji.get('computer'), 'Server up'); });
