const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const verifytoken = require('../functions/verifytoken');
module.exports = async(req,res,next)=>{
    const token = req.cookies.accessToken;

    const results = verifytoken(token,process.env.ACCESS_TOKEN);
    if(!results) return res.status(401).send({meesage:"Bad Token"});
    req.user = results;
    return next();
}