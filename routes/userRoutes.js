const express = require("express");
require("express-async-errors");
const {
    loginController,
    registerController,
    refresh,
} = require("../controller/userController");
const {
    loginMiddleware,
    registerMiddleware,
} = require("../middleawreController/UserMW");
const router = express.Router();

router.post("/login", loginMiddleware, loginController);
router.post("/register", registerMiddleware, registerController);
router.get("/refresh", refresh);
module.exports = router;
