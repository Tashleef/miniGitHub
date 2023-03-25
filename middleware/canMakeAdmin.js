const canDoTask = require("../functions/canDoTask")

module.exports = (req,res,next)=>{
    if(canDoTask("makeAdmin" , req.role,req.configuration)) return next();
    return res.status(404).send( { message : "Not Authorized " } )
}