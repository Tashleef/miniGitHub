module.exports = (req,res,next)=>{
    if(req.header.token){
        return res.send({
            message:"something wrong you are already logged in"
        }).status(404);
    }
    return next();
}