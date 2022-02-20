const db = require('../db.js');
const {ProductosModel} = require('../models/producto.model.js');
const {UserModel} = require('../models/user.model.js');
const {createTransport} = require('nodemailer')
const logger = require('../logger.js')

const transporter = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:'codertest141@gmail.com',
        pass: 'coder1234'
    }
})

const mailOptions = {
    from: 'Servidor Coder',
    to: 'codertest141@gmail.com',
    subject: 'Nuevo usuario',
    html: '<h1>Nuevo usuario se ha registrado</h1>'
}
async function sendMailGmail() {
    try {
      const response = await transporter.sendMail(mailOptions);
        logger.log('warn',response);
    } catch (error) {
      logger.log('error',error);
    }
  }


export async function createProduct(product: any){
    try {
        const responseProduct = await ProductosModel.create(product);
        logger.log('warn',responseProduct);
    } catch (error) {
        logger.log('error',error)
    }
}

export async function creatUser(user: any){
    try {
        const responseUser = await UserModel.create(user);
        logger.log('warn',responseUser);
        await sendMailGmail()
    } catch (err) {
        logger.log('error',err)
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