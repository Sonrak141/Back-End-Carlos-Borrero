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


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/', (req: any, res: any) => {
    res.render('welcome', {Layout: 'index'})
})
 productos.get('/', (req, res) => {
     res.render('formulario', {Layout: 'index'})
 })

 productos.post('/productoNuevo',adminCheck, async (req: any, res: any) => {
    const {body} = req;
    await prod.save(body)
    res.redirect('/api/productos')
    
})
 carrito.get('/', (req, res) => {
     res.send('Carrito')
 })

app.get('/', (req, res) => {})

     app.use('/api/productos', productos);
     app.use('/api/carrito', carrito);

app.listen(8080,() => console.log(emoji.get('computer'),'Server up'))