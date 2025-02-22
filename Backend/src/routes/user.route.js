const express = require("express");
const router = express.Router();
const {registerUser,verify_user} = require('../controllers/user.controller')

router.post("/register",registerUser)
router.post("/verify",verify_user);
module.exports = router;