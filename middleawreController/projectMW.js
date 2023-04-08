const authenticated = require("../middleware/authenticated");
const checkDotExt = require("../middleware/checkDotExt");
const isValidProjectName = require("../middleware/isValidProjectName");
const {body} = require("express-validator");
const getProjectConfig = require("../middleware/getProjectConfig");
const canGet = require("../middleware/canGetProject");
const existUser = require("../middleware/existUser");
const isNotMemberBefore = require("../middleware/isNotMemberBefore");
const canAddMember = require("../middleware/canAddMember");
const canDeleteMember = require("../middleware/canDeleteMember");
const isInTheProject = require("../middleware/isInTheProject");
const isNotSameMember = require("../middleware/isNotSameMember");
const canMakeAdmin = require("../middleware/canMakeAdmin");
const canEditProject = require("../middleware/canEditProject");
const canDeleteProject = require("../middleware/canDeleteProject");
const canAcceptEdit = require("../middleware/canAcceptEdit");

const addProjectMiddleware = [
    authenticated,
    isValidProjectName,
    checkDotExt,
    body("projectName")
        .notEmpty()
        .withMessage("the project name mustn't be empty"),
];

const editProjectMiddleware = [
    authenticated,
    getProjectConfig,
    canEditProject,
    checkDotExt,
];

const getProjectMiddleware = [authenticated, getProjectConfig, canGet];

const deleteProjectMiddleware = [
    authenticated,
    getProjectConfig,
    canDeleteProject,
];

const addMemberMiddleware = [
    authenticated,
    getProjectConfig,
    canAddMember,
    existUser,
    isNotMemberBefore,
];

const removeMemberMiddleware = [
    authenticated,
    getProjectConfig,
    canDeleteMember,
    isNotSameMember,
    isInTheProject,
];

const makeAdminMiddleware = [
    authenticated,
    getProjectConfig,
    canMakeAdmin,
    isInTheProject,
];

const getPendingMiddleware = [authenticated, getProjectConfig, canAcceptEdit];

const middleware = {
    addProjectMiddleware,
    getProjectMiddleware,
    addMemberMiddleware,
    removeMemberMiddleware,
    makeAdminMiddleware,
    deleteProjectMiddleware,
    editProjectMiddleware,
    getPendingMiddleware,
};

module.exports = middleware;
