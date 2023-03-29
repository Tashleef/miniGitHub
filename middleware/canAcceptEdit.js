const canDoTask = require("../functions/canDoTask")

module.exports = (req, res) => {
    if(canDoTask("acceptEdit", req.role, req.configuration)) return next();
    return res.status(401).send({ message: 'Unauthorized' });
}