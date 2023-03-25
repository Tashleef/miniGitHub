const Project = require("../models/project")

module.exports = async(req,res,next)=>{
    const project = await Project.findOne( { projectName : req.params.projectName , "members.username" : req.user.name } ,
    { members : { $elemMatch : { username : req.user.name } } }
    )
}