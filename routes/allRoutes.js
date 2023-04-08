const router = require("express").Router();
const app = require("../test");
const userRouter = require("./userRoutes");
const projectRouter = require("./projectRoutes");

router.use(userRouter);
app.use(projectRouter);
router.use(app);
module.exports = router;
