const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        min: 10,
        max: 50,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    confirmationCode: {
        type: String,
        unique: true,
        sparse: true,
    },
});
const User = mongoose.model("User", userSchema);
module.exports = {
    User: User,
    userSchema: userSchema,
};
