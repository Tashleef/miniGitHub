const {validationResult} = require('express-validator');
const changeFolderName = require('../functions/changeFolderName');
const deleteFolder = require('../functions/deleteFolder');
const getFileFromfolder = require('../functions/getFileFromfolder');
const uploadToFiles = require('../functions/uploadToFiles');
const Project = require('../models/project');

const addProject = async (req, res) => {
   

    // validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send(errors.array());
    }
   const { projectName } = req.body;
   const { email,name } = req.user;
    // rename file folder to date + folder name
    const file = req.files[0];
    file.originalname = changeFolderName(file.originalname);
  
    // set project path and file name
    const isPublic = req.body.isPublic === true || req.body.isPublic === undefined;
    const projectPath = `./uploads/${isPublic ? 'public' : 'private'}/${projectName}`;
    console.log(projectPath);
    const currentPath = `${projectPath}/${file.originalname}`;
  
    // set project data
    const member = {
      email,
      username: name,
      role: 'owner',
    };
    const configuration = req.body.configuration < 24 || !req.body.configuration ? 28 : req.body.configuration;
    const projectData = {
      projectName,
      projectPath,
      currentPath,
      versions: [file.originalname],
      owner: member,
      members: [member],
      isPublic,
      configuration,
    };
  
    // save project to database and upload file
    const uploadResult = uploadToFiles(file, projectPath);
    if (!uploadResult) {
      return res.status(500).send({ message: 'Something went wrong' });
    }
  
    const project = new Project(projectData);
    await project.save();
  
    return res.status(201).send({ message: 'Project created' });
  };

  const getProject = async (req, res) => {
    const projectName = req.params.projectName;
  
    // find the latest version of the project
    const project = await Project.findOne(
      { projectName },
      { currentPath: 1 }
    );
  
    // retrieve the project file from the specified path
    const file = getFileFromfolder(project.projectPath);
    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }
  
    // send the file to the client
    return res.download(project.projectPath);
  };

// how edit project will work ?? 
// i am thinking about you can get back to any stable version
// middlewares are should be authenticated and member in the project and can edit and the project is not empty and is exe
const editProject = async (req, res) => {
     const { projectName } = req.params;
     const { name,email } = req.user;
     const { role } = req.role;

     const file = req.files[0];
     file.originalname = changeFolderName(file.originalname);

    const path = `pending/${ projectName }`;

    // creating pending object 
    const pending = {
      member: {
        username: name,
        email,
        role,
      },
      fileName: file.originalname
    }

    // update project model and adding a new pending request
    await Project.updateOne({
      projectName,
    },
    {
      $push: {
        pendings: pending
      }
    });

    return res.status(200).send({ message: "Edit project request has been sent" });

}

const getPending = async (req, res) => {
  // Extract the "projectName" parameter from the request object
  const { projectName } = req.params;

  // Find a project in the database that matches the "projectName"
  const project = await Project.findOne(
    { projectName },
    // Include only the "pendings" field in the result
    { pendings: 1 }
  );

  // Send a success response with the "pendings" array
  return res.status(200).send({ message: "Pendings retrieved successfully", pendings: project.pendings });
}

const deleteProject = async (req, res) => {
    const projectName = req.params.projectName;
  
    // delete the project data from the database
    const project = await Project.findOneAndDelete({ projectName }, { isPublic: 1 });

    // getting path for pendings and project path
    const { isPublic } = project;
    const publicOrPrivate = (isPublic)?'public':'private';
    const suffix = `${publicOrPrivate}/${projectName}`;
    const pendingsPaths = `./pending/` + suffix;
    const projectPath = `./uploads/` + suffix;

    // delete the project file from the specified path
    deleteFolder(pendingsPaths);
    deleteFolder(projectPath);
  
    // send a success response to the client
    return res.status(200).send({ message: 'Project deleted' });
  }

const addMember = async (req, res) => {
    // Extract the project name from the request parameters.
    const { projectName } = req.params;
  
    // Extract the name and email of the member from the request object and create a user object.
    const { name, email } = req.member;
    const user = {
      username: name,
      email: email,
      role: 'member',
    };
  
    // Use Mongoose's updateOne() method to add the user to the "members" array of the project.
    const project = await Project.updateOne(
      { projectName: projectName },
      { $push: { members: user } }
    );
  
    // Send a successful response back to the client with a message indicating that the member was added.
    return res.status(200).send({ message: 'Member added' });
  };

const removeMember = async (req,res) => {

    await Project.updateOne(
     { projectName: req.params.projectName },
     { $pull: { members: { username: req.body.name } } }
    );

        return res.status(200).send({ message: "Member deleted" });
}


const makeAdmin = async(req,res)=>{
    const { projectName } = req.params;
    const { name } = req.body;

    // Use mongoose updateOne method to find and update the member role to "admin".
    await Project.updateOne(
        { projectName: projectName, "members.name": name },
        { $set: { "members.$.role": "admin" } }
    );

    // sends successfull response back to client with message indicating that the member is now admin
    return res.status(200).send({ message: `${name} is now admin` });
}

const projectController = {
    addProject,
    getProject,
    addMember,
    removeMember,
    makeAdmin,
    deleteProject,
    editProject,
    getPending
}

module.exports = projectController;