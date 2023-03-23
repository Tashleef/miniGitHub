const Project = require("../models/project")

module.exports = async(req,res,next)=>{
    try{
    const project = Project.findOne({projectName:req.params.projectName,"members.username":req.body.name},{projectName:1});
    if(!project) return res.status(404).send({message:"user is not in the group"});
    return next();
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}