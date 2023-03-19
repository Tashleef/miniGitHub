const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({

    refreshToken:{
        type:String,
        unique:true,
        required:true,
    },
    userId:{
        type:String,
        unique:true,
        required:true,
    },
    accessToken:{
        type:String,
        unique:true,
        required:true
    }
});

const Token = mongoose.model('Token',tokenSchema);
module.exports = Token;