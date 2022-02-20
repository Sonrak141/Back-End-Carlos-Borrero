const express = require('express');

const router = express.Router()

class productosRouter{
    constructor(){

    }

    start(){
        router.get('/productonuevo', (req, res) => {
            res.render('formulario', {Layout: 'index'})
        })
        router.get('/', async (req, res) => {
           const listaProductos = await readProduct()
           logger.log('warn',listaProductos)
           
            res.render('productos', {
                Layout: 'index',
                listaProductos,
               })
        })
       
        router.post('/productonuevo',adminCheck, async (req, res) => {
           const {body} = req;
           await createProduct(body)
           res.redirect('/api/productos')
           
       })
    }
}

module.exports = productosRouter