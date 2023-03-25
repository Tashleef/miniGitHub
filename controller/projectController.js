const {validationResult} = require('express-validator');
const changeFolderName = require('../functions/changeFolderName');
const getFileFromfolder = require('../functions/getFileFromfolder');
const uploadToFiles = require('../functions/uploadToFiles');
const Project = require('../models/project');
const addProject = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(404).send(errors.array());

    
    let file = req.files[0];
    file.originalname = changeFolderName( file.originalname ) //changing name off folder to be the date + the name of the folder


    let isPublic = ( req.body.isPublic === true || req.body.isPublic === undefined ) 
    let path = `./uploads/${(isPublic)?'public':'private'}/` ;
    let projectPath = path + file.originalname;
    
    const member = {
        email : req.user.email,
        username : req.user.name,
        role : "owner",
    }

    const project = new Project( {
        projectName : req.body.projectName,
        projectPath : projectPath,
        owner :  member,
        members : [ member ],
        isPublic : isPublic,
        configuration : ( req.body.configuration > 24 || !req.body.configuration )? 24 : req.body.configuration 
    } );

    const results = uploadToFiles( file,path )

    if(!results) return res.status( 500 ).send( { message : "Something wrong" } ) 

    await project.save();
    return res.status(201).send( { message : "Project Created" } ) 
  
}

const getProject = async(req,res)=>{
    const projectName = req.params.projectName;
    const project = await Project.findOne( { projectName : projectName}  ).select( 'projectPath' );
    const results = getFileFromfolder( project.projectPath ) ;
    if(!results) return res.status(404).send( { message : "File not Found" } ) ;
    return res.download( project.projectPath );
}


const editProject = async(req,res)=>{

}


const addMember = async(req,res)=>{
    let projectName = req.params.projectName
    const user = {
        username:req.member.name,
        email:req.member.email,
        role:"member"
    }
    let project = await Project.updateOne( { projectName : projectName }  , { $push : { members : user } } )
    return res.status(200).send( { message : "Member added" } ) 
}

const removeMember = async(req,res)=>{

        await Project.updateOne(
                { projectName : req.params.projectName } ,
                { $pull : { members : { username : req.body.name } } 
        } )

        return res.status(200).send( { message : "Member deleted" } )

}

const makeAdmin = async(req,res)=>{

    await Project.updateOne( { projectName : req.params.projectName , "members.name" : req.body.name }  , { $set : { "members.role" : "admin" } } )
    return res.status(200).send( { message : `${req.body.name} is now admin` } )
}

const projectController = {
    addProject:addProject,
    getProject:getProject,
    addMember:addMember,
    removeMember:removeMember,
    makeAdmin:makeAdmin,
}

module.exports = projectController;