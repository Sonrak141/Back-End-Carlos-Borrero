const productosDTO = require('../DTOs/productosDTO.js')
const productosBaseDAO = require('./productosBaseDAO.js')

class productosMongoDAO extends productosBaseDAO{
    constructor(){
        super()
        this.productos=[]
    }

    obtenerProductos
    guardarProductos
    actializarProductos
    borrarProductos
}

module.exports = productosMongoDAO