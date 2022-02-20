const productosMEMDAO = require('./productosMEMDAO.json');
const productosFileDAO = require('./productosFileDAO.json');
const productosMongoDAO = require('./productosMongoDAO.json');
const logger = require('../../logger.js');


class productosFactoryDAO{
    static get(tipo){
        switch (tipo){
            case "MEM":
                return new productosMEMDAO    
            case "File":
                return new productosMEMDAO    
            case "Mongo":
                return new productosMEMDAO    
            default:
                return new productosMEMDAO        
        }
    }
}

module.exports = productosFactoryDAO