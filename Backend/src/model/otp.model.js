const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    emailId: {
        type: String,
        required: true,
    },
    registrationId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        enum:["Male","Female"],
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
         expires: 300, //5 minutes
    },
});

module.exports = mongoose.model("Otp", otpSchema);