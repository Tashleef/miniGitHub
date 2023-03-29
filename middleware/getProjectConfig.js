const Project = require('../models/project');

module.exports = async (req,res,next)=>{
    const { projectName } = req.params;
    const project = await Project.findOne({
        projectName,
        "members.username": req.user.name
      }, {
        members: { $elemMatch: { username: req.user.name } },
        configuration: 1
    });
    if (!project) return res.status(404).send({ message: "Project Not Found" });
    req.role = project.members[0].role;
    req.configuration = project.configuration;
        return next();
    
        
}