const ListMaker = require('./repositories/class.js')
const express = require('express')
const {Router} = express()
const emoji = require('node-emoji');
const handlebars = require('express-handlebars');
const {createProduct, readProduct, creatUser, readUser} = require('./repositories/mongodb.js')
const logger = require('./logger.js')
const productosRouter = require('./router/productos.route.js')


const app = express()
const productos = express.Router()
const carrito = express.Router();
const usuario = express.Router();

const admin = true
let log = false
const adminCheck = (req: any, res: any, next: any) => {
    if (admin) {
        next();
    }else{
        logger.log('warn','No eres admin')
    }
}

const auth = async (req: any, res: any, next: any) =>{
    const {body} = req;
    const listUsers = await readUser()
    listUsers.forEach((_user: any) => {
        if (_user.usuario === body.usuario) {
            if(_user.contrasena === body.contrasena){
                next();
            }else{
                logger.log('info','Contrasena incorrecta')
            }
        }else{logger.log('info','Usuario no existe')}
    });
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
     await logger.log('warn',productos)
     await car.save(newCar)
    res.redirect('/api/carrito')
   
 })

 usuario.get('/', async (req: any, res: any) => {
     const listUsers = await readUser()
     logger.log('warn',listUsers)
     res.status(200).render('formLogin', {layout: 'index'})
 })
 usuario.post('/',auth, async (req: any, res: any) => {
    res.status(200).redirect('/api/productos')

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

     app.use('/api/productos', productosRouter.start());
     app.use('/api/carrito', carrito);
     app.use('/user',usuario);

const PORT = process.argv[2] || 8080

app.listen(8080,() => logger.log('info',emoji.get('computer'),'Server up'))