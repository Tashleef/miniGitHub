const canDoTask = require("../functions/canDoTask")

module.exports = (req, res, next) => {
    if(canDoTask('deleteProject', req.role, req.configuration)) return next();
    return res.status(401).send({ message: 'unauthorized' });
}