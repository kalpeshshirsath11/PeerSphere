const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        enum:["Male","Female"],
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    registrationId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);