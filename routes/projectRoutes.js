const express = require('express');
const {addProject,getProject} = require('../controller/projectController');
const {addProjectMiddleware,getProjectMiddleware} = require('../middleawreController/projectMW');
const router = express.Router();

router.post('/addProject',addProjectMiddleware,addProject);
router.get('/:projectName',getProjectMiddleware,getProject);
module.exports = router;