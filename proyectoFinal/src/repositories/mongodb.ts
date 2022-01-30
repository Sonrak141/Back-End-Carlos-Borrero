const db = require('../db.js');
const {ProductosModel} = require('../models/producto.model.js');
const {UserModel} = require('../models/user.model.js');


export async function createProduct(product: any){
    try {
        const responseProduct = await ProductosModel.create(product);
        console.log(responseProduct);
    } catch (error) {
        console.log(error)
    }
}

export async function creatUser(user: any){
    try {
        const responseUser = await UserModel.create(user);
        console.log(responseUser);
    } catch (err) {
        console.log(err)
    }
}

// createProduct();

export async function readProduct(){
    const productos = await ProductosModel.find();
    return productos
}

export async function readUser(){
    const users = await UserModel.find();
    return users
}