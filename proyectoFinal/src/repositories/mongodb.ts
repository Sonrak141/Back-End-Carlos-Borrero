const db = require('../db.js');
const {ProductosModel} = require('../models/producto.model.js');


export async function createProduct(product){
    try {
        const responseProduct = await ProductosModel.create(product);
        console.log(responseProduct);
    } catch (error) {
        console.log(error)
    }
}

// createProduct();

export async function readProduct(){
    const productos = await ProductosModel.find();
    return productos
}