const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
});

const pendingSchema = new mongoose.Schema({
    member: {
        type:memberSchema,
        required:true,
    },
    fileName: {
        type: String,
    }
})

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        unique: true,
        required: true,
    },
    projectPath: {
        type: String,
        required: true,
    },
    currentPath: {
        type: String,
        required: true,
    },
    versions: {
        type: [String],
        required: true,
    },
    owner: {
        type: memberSchema,
        required: true,
    },
    members: [{
        type: memberSchema,
        unique: true,
    }],
    pendings: [{
        type: pendingSchema,
        default: []
    }],
    isPublic: {
        type: Boolean,
        default: true,
    },
    // Rules:
    // 1: get file
    // 2: edit file
    // 3: add members
    // 4: accept edit
    // 5: remove member
    configuration: {
        type: Number,
        default: 28,
    },
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;