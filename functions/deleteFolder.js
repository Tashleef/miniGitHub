const fs = require('fs');
function deleteFolder (path) {
    if(!fs.existsSync(path)) {
        return ;
    }
    fs.readdirSync(path).forEach( (file) => {
        const currentPath = `${path}/${file}`;
        if(fs.lstatSync(currentPath).isDirectory()) {
            deleteFolder(currentPath);
        }
        else { 
            fs.unlinkSync(currentPath);
        }
    });

    fs.rmdirSync(path);
    return ;
}

module.exports = deleteFolder;