const express = require("express");
const router = express.Router();
const {registerUser,verify_user,loginUser,logoutUser} = require('../controllers/user.controller')

router.post("/register",registerUser)
router.post("/verify",verify_user);
router.post("/login",loginUser);
router.post("/logout",logoutUser);

module.exports = router;