const {validationResult} = require('express-validator');
const changeFolderName = require('../functions/changeFolderName');
const getFileFromfolder = require('../functions/getFileFromfolder');
const uploadToFiles = require('../functions/uploadToFiles');
const Project = require('../models/project');
const addProject = async (req,res)=>{
    // middlewares should be checking if the project name not found before
    // and if the token is validated
    // uploading the files mustn't exceed 100mb
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(404).send(errors.array());
    let file = req.files[0];
    file.originalname = changeFolderName(file.originalname);
    let isPublic = (req.body.isPublic === true || req.body.isPublic === undefined);
    let path = `./uploads/${(isPublic)?'public':'private'}/`;
    let projectPath = path+file.originalname;
    
    try{
        let configuration = (req.body.configuration >24 || !req.body.configuration)?24:req.body.configuration;
        const member = {
            email:req.user.email,
            username:req.user.name,
            role:"owner",
        }
        const project = new Project({
            projectName:req.body.projectName,
            projectPath:projectPath,
            owner: member,
            admins:[member],
            members:[member],
            isPublic:isPublic,
            configuration:configuration
        });
        const results = uploadToFiles(file,path);
        if(!results) return res.status(500).send({message:"Something wrong"});
        await project.save();
        return res.status(201).send({message:"Project Created"});
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}

const getProject = async(req,res)=>{
    const projectName = req.params.projectName;
    try{
        const project = await Project.findOne({projectName:projectName}).select('projectPath');
        const results = getFileFromfolder(project.projectPath);
        if(!results) return res.status(404).send({message:"File not Found"});
        return res.download(project.projectPath);
        
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message: "Something wrong"});
    }
}

const editProject = async(req,res)=>{

}


const addMember = async(req,res)=>{
    try{
        let projectName = req.params.projectName;
        let project = await Project.findOne({projectName:projectName}).select('members');
        const user = {
            username:req.member.name,
            email:req.member.email,
            role:"member"
        }
        project.members.push(user);
        await project.save();
        return res.status(200).send({message:"Member added"});

    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Someting wrong"});
    }
}

const removeMember = async(req,res)=>{
    try{
        const projectName = req.params.projectName;
        let project = await Project.updateOne({projectName:projectName},{$pull:{members:{username:req.body.name}}});
        await project.save();
        return res.status(200).send({message:"Member deleted"});
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"Something wrong"});
    }
}

const projectController = {
    addProject:addProject,
    getProject:getProject,
    addMember:addMember,
    removeMember:removeMember
}

module.exports = projectController;