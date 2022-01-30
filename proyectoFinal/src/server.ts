const ListMaker = require('./repositories/class.js')
const express = require('express')
const {Router} = express()
const emoji = require('node-emoji');
const handlebars = require('express-handlebars');
const {createProduct, readProduct, creatUser, readUser} = require('./repositories/mongodb.js')


const app = express()
const productos = express.Router()
const carrito = express.Router();
const usuario = express.Router();

const admin = true
const adminCheck = (req: any, res: any, next: any) => {
    if (admin) {
        next();
    }else{
        console.log('No eres admin')
    }
}

const auth = (req: any, res: any, next: any) =>{
    
}
app.engine('hbs',
    handlebars({
        extname:'hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/controllers',
        partialsDir: __dirname + '/controllers'
    })
)
app.set("view engine", "hbs")
app.set('views', './src/controllers')

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
 productos.get('/productonuevo', (req: any, res: any) => {
     res.render('formulario', {Layout: 'index'})
 })
 productos.get('/', async (req: any, res: any) => {
    const listaProductos = await readProduct()
    console.log(listaProductos)
    
     res.render('productos', {
         Layout: 'index',
         listaProductos,
        })
 })

 productos.post('/productonuevo',adminCheck, async (req: any, res: any) => {
    const {body} = req;
    await createProduct(body)
    res.redirect('/api/productos')
    
})
 carrito.get('/', async (req: any, res: any) => {
    const listaCarrito = await car.read()
    
     res.render('productosCarrito', {
         Layout: 'index',
         listaCarrito,
        })
 })

 carrito.get('/:id', async (req: any, res: any) => {
     const {id} = req.params
     const productos = await prod.read()
     const newCar = productos.find((prod: { id: any; })=> prod.id == id).product
     await console.log(productos)
     await car.save(newCar)
    res.redirect('/api/carrito')
   
 })

 usuario.get('/', async (req: any, res: any) => {
     const listUsers = await readUser()
     console.log(listUsers)
     res.status(200).render('formLogin', {layout: 'index'})
 })
 usuario.post('/', async (req: any, res: any) => {
     const {body} = req
     console.log(body)
     const listUsers = await readUser()
     console.log(listUsers)

 })
 usuario.get('/newuser', async (req: any, res: any) =>{
     res.render('formUser', {layout: 'index'})
 })
 usuario.post('/newuser', async (req: any, res: any) => {
     const {body} = req;
     await creatUser(body);
     res.redirect('/user')
 })

app.get('/', (req: any, res: any) => {})

     app.use('/api/productos', productos);
     app.use('/api/carrito', carrito);
     app.use('/user',usuario);

const PORT = process.argv[2] || 8080

app.listen(8080,() => console.log(emoji.get('computer'),'Server up'))