const ListMaker = require('./class/class.js')
const express = require('express')
const app = express()
const {Router} = express()
const emoji = require('node-emoji');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const productos = express.Router()
const carrito = express.Router();
const admin = true

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const prod = new ListMaker('productos.txt')
const car = new ListMaker('carrito.txt')

productos.get('/', (req, res) => {
    res.send('Productos')
})
carrito.get('/', (req, res) => {
    res.send('Carrito')
})

app.get('/', (req, res) => {})

app.use('/api/productos', productos);
app.use('/api/carrito', carrito);

app.listen(8080, () => console.log('Server started on 8080'))