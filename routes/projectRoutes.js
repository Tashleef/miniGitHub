const express = require("express");
require("express-async-errors");
const {
    addProject,
    getProject,
    addMember,
    removeMember,
    deleteProject,
    editProject,
    makeAdmin,
    getPending,
    acceptPending,
} = require("../controller/projectController");
const {
    addProjectMiddleware,
    getProjectMiddleware,
    addMemberMiddleware,
    removeMemberMiddleware,
    editProjectMiddleware,
    deleteProjectMiddleware,
    makeAdminMiddleware,
    getPendingMiddleware,
} = require("../middleawreController/projectMW");
const router = express.Router();

router.post("/addProject", addProjectMiddleware, addProject);
router.get("/:projectName", getProjectMiddleware, getProject);
router.put("/:projectName/new-member", addMemberMiddleware, addMember);
router.delete(
    "/:projectName/remove-member",
    removeMemberMiddleware,
    removeMember
);
router.delete("/:projectName", deleteProjectMiddleware, deleteProject);
router.put("/:projectName", editProjectMiddleware, editProject);
router.put("/:projectName/make-admin", makeAdminMiddleware, makeAdmin);
router.get("/:projectName/pendings", getPendingMiddleware, getPending);
router.put("/:projectName/accept", acceptPending);

module.exports = router;
