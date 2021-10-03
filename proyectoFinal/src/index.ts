const db = require('./db.js');
const {ProductosModel} = require('./models/producto.model.js');

const product = {
    nombre: 'Producto 1',
    precio: 1234,
    imagen: 'imagen',
    stock: 100
}

async function createProduct(){
    try {
        const responseProduct = await ProductosModel.create(product);
        console.log(responseProduct);
    } catch (error) {
        console.log(error)
    }
}

createProduct();