const fs = require('fs');

module.exports = (path)=>{
    if(!path) return false;
    const file = fs.readFileSync(path);
    console.log(file);
    return file;
}