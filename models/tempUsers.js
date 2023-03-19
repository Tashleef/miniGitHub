const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        min:10,
        max:50,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    confirmationCode:{
        type:String,
        unique:true,
        sparse:true
    },    
});

module.exports = mongoose.model('TempUser' , tempUserSchema);