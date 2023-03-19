const {User} = require("../models/user")


module.exports = async (req,res,next)=>{
    try{
    const user = await User.findOne({ $or:[ {'email':req.body.email}, {'name':req.body.name}]});
    if(!user) return next();
    return res.send({message:"user already exist"}).status(404);
    }catch(e){
        console.log(e.message);
        return res.send({message:"somethine wrong"}).status(500);
    }
}