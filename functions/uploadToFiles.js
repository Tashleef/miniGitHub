const fs = require('fs');
const path = require('path');

module.exports = function(file,path){
   
    if (!fs.existsSync(path)) {
    fs.mkdirSync(path , { recursive: true },);
    }
    path += `/${file.originalname}`;
    fs.writeFile(path,file.buffer,(err)=>{
        if(err) throw err.message;
    });
    return true;
}