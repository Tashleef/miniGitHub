const canDoTask = require("../functions/canDoTask");

module.exports = (req,res,next)=>{
    if(canDoTask("deleteMember",req.role,req.config))
        return next();
    return res.status(401).send({message:"Not authorized"});
}