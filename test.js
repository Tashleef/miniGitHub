const express = require('express');
const changeFolderName = require('./functions/changeFolderName');
const upload = require('./functions/upload');
const app = express.Router();
const authenticated = require('./middleware/authenticated');
const checkDotExt = require('./middleware/checkDotExt');
app.get(`/test/:id` , [authenticated] , (req,res)=>{
    console.log(req.params);
    return res.send('ok');
    
})
module.exports = app;