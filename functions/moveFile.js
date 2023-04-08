const fs = require("fs");

function moveFile(source, destination) {
    if (!fs.existsSync(source)) return false;

    fs.rename(source, destination, (err) => {
        if (err) {
            console.log(err.message);
            throw err;
        } else {
            return true;
        }
    });
}

module.exports = moveFile;
