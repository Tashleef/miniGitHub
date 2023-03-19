module.exports = function(fileName){
    if(!fileName) return false;
    let ext = '';
    if(fileName.split('.').length >1 ){
          ext = fileName.substring(fileName.lastIndexOf('.'));
    }
    fileName = fileName + Date.now() + ext;
    return fileName;
}