require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/allRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const multer = require('multer');
require('./config/database');

app.use(multer().any());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cookieParser());

  
app.use(router);
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send({ message: 'Something Wrong.' });
})
app.listen(3000,()=>{
    console.log('server started');
});