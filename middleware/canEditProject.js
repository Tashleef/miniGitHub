const canDoTask = require("../functions/canDoTask");

module.exports = (req, res, next) => {
    if (canDoTask("editFile", req.projectRole, req.configuration))
        return next();

    return res.status(400).send({message: "Not authorized"});
};
