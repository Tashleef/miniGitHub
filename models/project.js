const mongoose = require('mongoose');
const {userSchema} = require('./user');
const member = {
    username:String,
    email:String,
}
const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        unique:true,
        required:true,
    },
    projectPath:{
        type:String,
        required:true,
    },
    owner:{
        type:member,
        required:true,
    },
    memebers:[{
     type:member,
     unique:true,   
    }],

    admins:[{
        type:member,
        unique:true
    }],
    isPublic:{
        type:Boolean,
        default:true,
    },
    // rules 
    // 1:get file, 2:edit file, 3:add members, 4:accept edit,5:remove member
    memberRules:{
        type:Number,
        default:7,
    },
    adminRules:{
        type:Number,
        default: (1<<5)-1,
    },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;