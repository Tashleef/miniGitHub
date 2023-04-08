const Project = require("../models/project");

module.exports = async (req, res, next) => {
    const projectName = req.params.projectName;
    const project = await Project.findOne({
        projectName: projectName,
        "members.username": req.user.name,
    }).select("projectName");
    if (!project) return res.status(400).send({message: "Not Allowed"});
    return next();
};
