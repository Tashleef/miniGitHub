const jwt = require("jsonwebtoken");
module.exports = (info) => {
    const token = jwt.sign(info, process.env.ACCESS_TOKEN, {
        expiresIn: "2h",
    });
    return token;
};
