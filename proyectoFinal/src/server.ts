const ListMaker = require('./class/class.js')
const express = require('express')
const {Router} = express()
const emoji = require('node-emoji');
const handlebars = require('express-handlebars');


const app = express()
const productos = express.Router()
const carrito = express.Router();

const admin = false
const adminCheck = (req, res, next) => {
    if (admin) {
        next();
    }else{
        console.log('No eres admin')
    }
}
app.engine('hbs',
    handlebars({
        extname:'hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views'
    })
)
app.set("view engine", "hbs")
app.set('views', './src/views')

const prod = new ListMaker('./src/productos.json')
const car = new ListMaker('./src/carrito.json')

const onClick = () => console.log('click')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
productos.use(express.static('public'));

app.get('/', (req: any, res: any) => {
    res.render('welcome', {Layout: 'index'})
})
 productos.get('/productonuevo', (req, res) => {
     res.render('formulario', {Layout: 'index'})
 })
 productos.get('/', async (req: any, res: any) => {
    const listaProductos = await prod.read()
    
     res.render('productos', {
         Layout: 'index',
         listaProductos,
        })
 })

 productos.post('/productonuevo',adminCheck, async (req: any, res: any) => {
    const {body} = req;
    await prod.save(body)
    res.redirect('/api/productos')
    
})
 carrito.get('/', async (req, res) => {
    const listaCarrito = await car.read()
    
     res.render('productos', {
         Layout: 'index',
         listaCarrito,
        })
 })

 carrito.post('/:id', async (req, res) => {
     const {id} = req.params
     const productos = await prod.read()
     const newCar = productos.find(producto => producto.id === id)
     console.log(newCar)
     car.save(newCar)
     res.redirect('/api/carrito')
 })

app.get('/', (req, res) => {})

     app.use('/api/productos', productos);
     app.use('/api/carrito', carrito);

app.listen(8080,() => console.log(emoji.get('computer'),'Server up'))