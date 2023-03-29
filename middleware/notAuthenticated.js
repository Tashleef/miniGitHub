const verifytoken = require("../functions/verifytoken");

module.exports = (req,res,next)=>{
    
    if(verifytoken(req.cookies.accessToken,process.env.ACCESS_TOKEN)) 
        return res.status(404).send({ message: "You are already logged in" })
    return next();
}