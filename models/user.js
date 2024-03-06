const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    isStudent:{
        type:Boolean,
        require:false
    },
    isTPO:{
        type:Boolean,
        require:false
    },
    isCompany:{
        type:Boolean,
        require:false
    },
    isAlumni:{
        type:Boolean,
        require:false,
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.getAuthToken = this.getAuthToken;
exports.validate = validateUser;
