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
    let isPublic = (req.body.isPublic === true || req.body.isPublic === undefined)?'public':'private';
    let path = `./uploads/${isPublic}/`;
    console.log(req.body.isPublic);
    let projectPath = path+file.originalname;
    
    try{
        let adminRules = (req.body.adminRules <=31)?req.body.adminRules:31;
        let memberRules = (req.body.memberRules <=7)?req.body.memberRules:7;
        let rules = adminRules | memberRules;
        if(rules !== adminRules || rules === memberRules){
            return res.status(404).send({message:"configuration are not correct"});
        }
        const project = new Project({
            projectName:req.body.projectName,
            projectPath:projectPath,
            owner:{
                email:req.user.email,
                username:req.user.name
                
            },
            members:[],
            isPublic:req.body.isPublic,
            memberRules:memberRules,
            adminRules:adminRules
        });
        console.log(project);
        const results = uploadToFiles(file,path);
        console.log('res ' + results);
        await project.save();
        return res.status(201).send({message:"Project Created"});
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:"something wrong"});
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


const projectController = {
    addProject:addProject,
    getProject:getProject
}

module.exports = projectController;