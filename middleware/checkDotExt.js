const fs = require('fs');
module.exports = (req,res,next)=>{
    let files = req.files;

    if(!files) return res.status(404).send('file not found');
    let file = files[0];
    let ext = '';
    if(file.originalname.split('.').length >1 ){
        ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    }
    if(ext === '.zip'){
        return res.status(404).send({message:"file must be in zip"});
    }
    else
    return next();
}