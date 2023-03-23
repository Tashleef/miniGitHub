const mongoose = require('mongoose');
const {userSchema} = require('./user');
const member = {
    username:String,
    email:String,
    role:String,
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
    members:[{
     type:member,
     unique:true,   
    }],
    isPublic:{
        type:Boolean,
        default:true,
    },
    // rules 
    // 1:get file, 2:edit file, 3:add members, 4:accept edit,5:remove member
    configuration:{
        type:Number,
        default:28,
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;