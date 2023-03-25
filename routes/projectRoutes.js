const express = require('express');
const {addProject,getProject,addMember, removeMember} = require('../controller/projectController');
const {addProjectMiddleware,getProjectMiddleware, addMemberMiddleware, removeMemberMiddleware} = require('../middleawreController/projectMW');
const router = express.Router();

router.post('/addProject',addProjectMiddleware,addProject);
router.get('/:projectName',getProjectMiddleware,getProject);
router.put('/:projectName/new-member',addMemberMiddleware,addMember);
router.delete('/:projectName/remove-member',removeMemberMiddleware,removeMember)

module.exports = router;