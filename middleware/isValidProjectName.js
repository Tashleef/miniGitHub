const Project = require("../models/project");

module.exports = async (req, res, next) => {
    try {
        const project = await Project.findOne({
            projectName: req.body.projectName,
        });
        if (project)
            return res
                .status(400)
                .send({message: "try another name project already exist"});
        return next();
    } catch (err) {
        return res.status(500).send("something happened");
    }
};
