import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    age:{
        type: Number,
        require:true
    },
    email:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

export const UserModel = mongoose.model('User'.Schema)