const Project = require('../models/project');

module.exports = async (req,res,next)=>{
    const projectName = req.params.projectName;

    console.log(projectName);
    try{
        const project = await Project.findOne({projectName:projectName});
        if(!project) return res.status(404).send({message:"Project Not Found"});
        return next();
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}