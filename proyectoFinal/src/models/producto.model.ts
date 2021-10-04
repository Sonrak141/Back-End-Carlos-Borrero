const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    }, 
    precio:{
        type: Number,
        required:true,
    },
    imagen:{
        type:String,    
        // required:true,
    },
    stock:{
        type:Number,
        // required:true,
    }
})

export const ProductosModel = mongoose.model('Productos', ProductosSchema)