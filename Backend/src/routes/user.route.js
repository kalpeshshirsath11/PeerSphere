const express = require("express");
const router = express.Router();
const {registerUser,verify_user} = require('../controllers/user.controller');
const {askQuestion, getAllQuestions, findQuestionsById} = require('../controllers/QuestionController');
const {protect} = require('../middleware/authMiddleware');

router.post("/register",registerUser)
router.post("/verify",verify_user); 

// question route 
router.post("/", protect,askQuestion);
router.get("/", getAllQuestions);
router.get("/:id", findQuestionsById);


module.exports = router;