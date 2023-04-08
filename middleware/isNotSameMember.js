module.exports = (req, res, next) => {
    if (req.user.name === req.body.name)
        return res.status(404).send({message: "Not Found"});
    return next();
};
