const express = require('express');
const emoji = require('node-emoji');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const productList =require('./class/class');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const prod = new productList('./productos.txt')



io.on('connection', async (socket)=>{
    const data = await prod.read();
    console.log(emoji.get('pizza'),'Usuario Conectado')
    socket.emit('connectionMessage', 'Bienvenidos a el Socket')
    socket.emit('Product List', data)
    socket.on('disconnect', ()=>{
        console.log(emoji.get('fire'),'Usuario Desconectado')
    })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.html')
});

httpServer.listen(8080,() => console.log(emoji.get('computer'),'Server up'))