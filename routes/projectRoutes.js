const express = require('express');
const {addProject,getProject,addMember} = require('../controller/projectController');
const {addProjectMiddleware,getProjectMiddleware, addMemberMiddleware} = require('../middleawreController/projectMW');
const router = express.Router();

router.post('/addProject',addProjectMiddleware,addProject);
router.get('/:projectName',getProjectMiddleware,getProject);
router.post('/new-member/:projectName',addMemberMiddleware,addMember);
module.exports = router;