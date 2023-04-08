const {body} = require("express-validator");

const notAuthenticated = require("../middleware/notAuthenticated");
const notRegistered = require("../middleware/notRegistered");
const registered = require("../middleware/registered");

const registerMiddleware = [
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("email field must be valid email"),
    body("name")
        .notEmpty()
        .isString()
        .isLength({min: 3, max: 10})
        .withMessage("name field must be minimum 3 and maximum 10"),
    body("password")
        .notEmpty()
        .isStrongPassword()
        .withMessage("should be a strong password"),
    notAuthenticated,
    notRegistered,
];

const loginMiddleware = [
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("email field must be valid email"),
    body("password")
        .notEmpty()
        .withMessage("password must't be empty")
        .isStrongPassword()
        .withMessage("incorrect password try again"),
    notAuthenticated,
    registered,
];

const middlewares = {
    registerMiddleware,
    loginMiddleware,
};
module.exports = middlewares;
