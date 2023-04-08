const Project = require("../models/project");

module.exports = async (req, res, next) => {
    try {
        const project = await Project.findOne(
            {
                projectName: req.params.projectName,
                "members.username": req.body.name,
            },
            {projectName: 1, members: {$elemMatch: {username: req.body.name}}}
        );

        if (!project)
            return res.status(404).send({message: "user is not in the group"});
        if (
            project.members[0].role === "onwer" ||
            project.members[0].role === "admin"
        )
            return res
                .status(401)
                .send({message: "You can't apply this on owner"});
        return next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({message: "Something wrong"});
    }
};
