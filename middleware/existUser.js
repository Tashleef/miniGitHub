const {User} = require("../models/user");

module.exports = async (req, res, next) => {
    const name = req.body.name;
    const user = await User.findOne({name: name}).select("name email");
    if (!user) return res.status(404).send({message: "User not found"});

    return next();
};
