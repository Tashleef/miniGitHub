const authenticated = require("../middleware/authenticated");
const checkDotExt = require("../middleware/checkDotExt");
const isValidProjectName = require("../middleware/isValidProjectName");
const {body}  = require('express-validator');
const existProject = require("../middleware/getRole");
const canGet = require('../middleware/canGetProject');
const existUser = require("../middleware/existUser");
const isNotMemberBefore = require("../middleware/isNotMemberBefore");
const canAddMember = require("../middleware/canAddMember");
const canDeleteMember = require("../middleware/canDeleteMember");
const isMember = require('../middleware/isMember');
const addProjectMiddleware = [
    authenticated,
    isValidProjectName,
    checkDotExt,
    body('projectName').notEmpty().withMessage('the project name mustn\'t be empty'),
    //body('isPublic').isBoolean(),
];

const getProjectMiddleware = [
    authenticated,
    existProject,
    canGet,
];

const addMemberMiddleware = [
    authenticated,
    existProject,
    canAddMember,
    existUser,
    isNotMemberBefore
];

const removeMemberMiddleware = [
    authenticated,
    existProject,
    canDeleteMember,
    existUser,
    isMember
]

const middleware = {
    addProjectMiddleware:addProjectMiddleware,
    getProjectMiddleware:getProjectMiddleware,
    addMemberMiddleware:addMemberMiddleware
}

module.exports = middleware;