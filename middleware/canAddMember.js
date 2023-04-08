const canDoTask = require("../functions/canDoTask");

module.exports = async (req, res, next) => {
    if (canDoTask("addMember", req.role, req.configuration)) return next();
    return res.status(401).send({message: "Not authorized"});
};
