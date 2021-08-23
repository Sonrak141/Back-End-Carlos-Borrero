const productsListMaker = require('./class/class.js')
const express = require('express');



interface prodFill {
    title: string;
    price: number;
    thumbnail: string
}

interface product {
    id: number;
    product: prodFill;
}

interface productsList {
    archivo: string;
    id: number;
    data: product[];
}

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const prod = new productsListMaker('./productos.txt');

app.set('views', './views/')
app.set('view engine', 'pug');

app.get('/', (req: any, res: any) => {
    res.render('index')
})

app.post('/productos', async (req: any, res: any) => {
    const {body} = req;
    await prod.save(body)
    res.redirect('/')
})

app.get('/productos', async (req: any, res: any) =>{
    const productos = await prod.read();
    
    res.render('productos', {
        productos
      });
})




const PORT = 8082;
const server = app.listen(PORT, () => {
    console.log('Servidor productos Api corriendo')
})