const { User } = require("../models/user");

module.exports = async(req,res,next)=>{
    const name = req.body.name;
    try{
    const user = await User.findOne({name:name}).select('name email');
    if(!user) return res.status(404).send({message:"User not found"});
    return next();
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}