const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const createMail = require('../utils/nodemailer')
const Otp = require('../model/otp.model')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {
        const { Name, Gender, emailId, registrationId, password } = req.body;

    
        if (!Name || !Gender || !emailId || !registrationId || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const alreadyExist = await User.findOne({
            $or: [{ emailId }, { registrationId }]
        }).select("Name");

        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User with this Email ID or Registration ID already exists"
            });
        }


        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const hashed_otp = await bcrypt.hash(otp.toString(),10);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailId,
            subject: "Your OTP for Registration",
            text: `Hello ${Name},\n\nYour OTP for registration is: ${otp}.\nIt is valid for 10 minutes.\n\nRegards,\nPeerSphere Team`
        };
        await createMail.sendMail(mailOptions);
        const sentOtp = await Otp.create({
            emailId,registrationId,otp:hashed_otp,password: hashedPassword,Name,Gender
        });
        

        // Create new user
        

        if (!sentOtp) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }

        return res.status(201).json({
            success: true,
            message: "otp sent successfully",
            sentOtp
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
const verify_user = async (req, res) => {
    try {
        const { registrationId, emailId, otp } = req.body;

        // Validate input
        if (!registrationId || !emailId || !otp) {
            return res.status(400).json({
                message: "Please provide registration ID, email, and OTP",
                success: false
            });
        }

        // Fetch the latest OTP for the user
        const userInfo = await Otp.findOne({
            $or: [{ emailId }, { registrationId }]
        }).sort({ createdAt: -1 });

        if (!userInfo) {
            return res.status(400).json({
                message: "OTP not found or already used",
                success: false
            });
        }

        // Check if OTP is expired
        if (userInfo.expiresAt && userInfo.expiresAt < new Date()) {
            return res.status(400).json({
                message: "OTP has expired. Please request a new one.",
                success: false
            });
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp.toString(), userInfo.otp);
        if (!isOtpValid) {
            return res.status(401).json({
                message: "Invalid OTP",
                success: false
            });
        }

        // Delete OTP after verification
        await Otp.deleteOne({ _id: userInfo._id });

        // Save user in the database (without rehashing password)
        const user = await User.create({
            emailId: userInfo.emailId,
            registrationId: userInfo.registrationId,
            password: userInfo.password, // Using stored hashed password
            Name: userInfo.Name,
            Gender: userInfo.Gender
        });

        return res.status(200).json({
            success: true,
            message: "Signed up successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const loginUser = async(req,res)=>{
    try{
        const { registrationId, emailId, password } = req.body;
            if(!registrationId && !emailId){
                return res.status(400).json({
                    message:"please provide information",
                    success:false
                })
            }
            if(!password){
                return res.status(400).json({
                    message:"please provide password",
                    success:false
                })
            }
            const user1 = await User.findOne({
                $or: [{ emailId }, { registrationId }]
            }).select("Name emailId registrationId password");
            const flag = bcrypt.compare(password.toString(),user1.password?.toString());
            if(!flag){
                return res.status(400).json({
                    message:"invalid password",
                    success:false
                })
            }
            const token = await jwt.sign({
                _id:user1._id,
                Name:user1.Name,
                emailId:user1.emailId,
                registrationId:user1.registrationId
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn:process.env.TOKEN_EXPIRY
                }
                );
                if(!token){
                    res.status(500).json({err:"Error in token generation"});
                }
                res.cookie("token", token,{
                    // httpOnly:true,
                    // secure: true,
                    // sameSite: "None"
                }).status(200).json({
                    success: true,
                    token,
                    
                    message: "Logged in successfully",
                });
    

    }
    catch(e){
        console.log("error in login",e);
        return res.status(500).json({
            success:false,
            message:"Error in logging in"
        })
    }
    
}

const logoutUser = async(req,res)=>{
    return res
      .clearCookie("token", {
        httpOnly: true,
        // secure: true, // Match the login cookie settings
        // sameSite: "None",
        // partitioned: true
      })
      .status(200)
      .json({ message: "Logged out successfully" });
}


module.exports = {registerUser,verify_user,loginUser,logoutUser};