const productosDTO = require('../DTOs/productosDTO.js')
const productosBaseDAO = require('./productosBaseDAO.js')
const logger = require('../../logger.js')

class productosMEMDAO extends productosBaseDAO{
    constructor(){
        super()
        this.productos=[]
    }

    obtenerProductos = (_id) => {
        try {
            const indice = this.getIndex(_id, this.productos)
            return indice >= 0 ? [this.productos[indice]]:[]
        } catch (error) {
            logger.log('error', error)
            return []
        }
    }
    guardarProductos = (producto) => {
        try {
            const productoDTO = productoDTO(producto, this.getNextId(this.productos),new Date().toLocaleString())
            this.productos.push(productoDTO)
            return productoDTO
        } catch (error) {
            logger.log('error', error)
            return [] 
        }
    }
    actializarProductos = (_id, producto) => {
       try {
        const productoDTO = productoDTO(producto, this.getNextId(this.productos),new Date().toLocaleString())
        const indice = this.getIndex(_id, this.productos)
        if (indice >= 0){
            const productoActualizado = {
                ...this.productos[indice],
                ...productoDTO
            }
            this.productos[indice] = productoActualizado
        }
        
       } catch (error) {
        logger.log('error', error)
        return [] 
       }

    }
    borrarProductos =  (_id) => {
        try {
            return this.productos.splice(this.getIndex(_id, this.productos),1)[0]
        } catch (error) {
            logger.log('error', error)
            return [] 
        }
    }
}

module.exports = productosMEMDAO