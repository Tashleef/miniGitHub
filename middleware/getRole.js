const Project = require('../models/project');

module.exports = async (req,res,next)=>{
    const projectName = req.params.projectName;

    console.log(projectName);
    try{
        console.log(req.user);
        const project = await Project.findOne({
            projectName:projectName,
            "members.username":req.user.name
        },{members:{$elemMatch:{username:req.user.name}},configuration:1},
        );
        if(!project) return res.status(404).send({message:"Project Not Found"});
        req.projectRole = project.members[0].role;
        req.configuration=project.configuration;
        return next();
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}