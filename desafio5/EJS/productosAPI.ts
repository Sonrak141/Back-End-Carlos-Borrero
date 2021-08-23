const productsListMaker = require('./class/class.js')
const express = require('express');
const {Router} = express;



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
const api = express.Router();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const data1: prodFill = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://www.neolo.com/blog/wp-content/uploads/2020/04/Por-qu%C3%A9-usar-thumbnails-1024x1024.jpg'
}
const prod = new productsListMaker('./productos.txt');
prod.save(data1)
app.get('/', (req: any, res: any) => {
    res.sendFile(__dirname + '/files/index.html')
})

let view: product[] = [];
prod.read().then(
    (data: any[]) => data.map((obj) => {
        view.push(obj)
        api.get('/', (req: any, res: any, next: any) => {

            res.send(view)
        })
    })

);

api.get('/:num', (req: any, res: any)=>{
    const {num} = req.params;
    let product = {}
    const idNum = parseInt(num)
    prod.getById(idNum).then((data: any) => res.send(data))
});

api.post('/', (req: any, res: any) => {
    prod.save(req.body).then((data: any) => res.send(data))
})

api.put('/:id', (req: any, res: any) => {
    const {id} = req.params;
    prod.updateById(id, req.body).then((data: any) => res.send(data))
})

api.delete('/:id', (req: any, res: any) =>{
    const {id} = req.params;
    prod.deleteById(id).then((data: any) => res.send(data))
})

app.use('/api/productos', api)

const PORT = 8082;
const server = app.listen(PORT, () => {
    console.log('Servidor productos Api corriendo')
})