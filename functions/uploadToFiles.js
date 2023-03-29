const fs = require('fs');
module.exports = function(file,path){
   
    if(!fs.existsSync(path)) fs.mkdirSync(path);
    path += `/${file.originalname}`;
    fs.writeFile(path,file.buffer,(err)=>{
        if(err) throw err.message;
    });
    return true;
}