const multer = require('multer');
const fs = require('fs');
const upload = (file) => {
  if(!file) return ;
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const folder = './uploads'
        if(!fs.existsSync(folder)) fs.mkdirSync(folder);
          cb(null, './uploads/')
      },
      filename: function (req, file, cb) {
          console.log("File Object",file);
          let ext = '';
          if(file.originalname.split('.').length >1 ){
              ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
          }
          
          cb(null, file.fieldname + '-' + Date.now() + ext);

      },
  });
  return multer({ storage: storage,limits:{ fileSize: 100 * 1024 * 1024 } ,}).any(file);
}

module.exports = upload;