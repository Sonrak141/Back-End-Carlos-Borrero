const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usuario:{
        type:String,
        required:true,
    }, 
    contrasena:{
        type: String,
        required:true,
    },
    imagen:{
        type:String,    
        // required:true,
    },
    edad:{
        type:Number,
        // required:true,
    }
})

exports.UserModel = mongoose.model('User', UserSchema)