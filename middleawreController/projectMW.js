const authenticated = require("../middleware/authenticated");
const checkDotExt = require("../middleware/checkDotExt");
const isValidProjectName = require("../middleware/isValidProjectName");
const {body}  = require('express-validator');
const existProject = require("../middleware/existProject");


const addProjectMiddleware = [
    authenticated,
    isValidProjectName,
    checkDotExt,
    body('projectName').notEmpty().withMessage('the project name mustn\'t be empty'),
    //body('isPublic').isBoolean(),
];

const getProjectMiddleware = [
    authenticated,
    existProject
    //canGet,
]

const middleware = {
    addProjectMiddleware:addProjectMiddleware,
    getProjectMiddleware:getProjectMiddleware
}

module.exports = middleware;