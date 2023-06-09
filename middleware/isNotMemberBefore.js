const Project = require("../models/project");
const {User} = require("../models/user");

module.exports = async (req, res, next) => {
    const {projectName} = req.params;
    const {name} = req.body;
    const project = await Project.findOne(
        {projectName: projectName, "members.username": req.body.name},
        {_id: 1}
    );

    if (project)
        return res.status(400).send({message: "Member already in the project"});

    const user = await User.findOne({name: name}).select("name email -_id");
    req.member = user;
    return next();
};
