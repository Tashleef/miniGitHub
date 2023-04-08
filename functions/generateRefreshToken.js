const jwt = require("jsonwebtoken");
const expireation = 60 * 60 * 24 * 30;
module.exports = (info) => {
    const token = jwt.sign(info, process.env.REFRESH_TOKEN, {
        expiresIn: expireation,
    });
    return token;
};
