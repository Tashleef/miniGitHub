const {User} = require("../models/user");

module.exports = async (req,res,next)=>{

    if(!req.body.email) return res.status(404).send({ message: "not valid email" });
    const user = await User.findOne({ email: req.body.email });
    if(user) return next();
    return res.status(404).send({message:"user is not registered"});
 
}