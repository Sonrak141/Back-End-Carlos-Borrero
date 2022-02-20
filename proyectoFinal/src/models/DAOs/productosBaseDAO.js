const logger = require('../../logger.js')
class productosBaseDao{
    getNextId(productos){
        let max = productos.map(prod => {
            if (prod._id > max){
                max = prod._id;
            }else{
                prod._id = max + 1
            }
        })

    }

    getIndex(_id, productos){
        return productos.findIndex((product => {
            product ? product._id === Number(_id):true
        }))
    }

    obtenerProductos (){
        logger.log('error', 'No implementado')
    }

    guardarProductos (){
        logger.log('error', 'No implementado')
    }

    actualizarProductos (){
        logger.log('error', 'No implementado')
    }

    borrarProductos (){
        logger.log('error', 'No implementado')
    }
}

module.exports = productosBaseDao