const Question = require("../model/AskQuestion");

// ask question 
const askQuestion = async (req, res)=>{
    const {title,description, tags} = req.body;

    if(!title || !description){
        return res.status(400).json({message:"Title and Description are required"}); 
    }
    try{
        const question = new Question({title, description, tags, user: req.user._id});
        await question.save();
        res.status(201).json(question);
    }catch(err){
        res.status(500).json({message:"serving error"});
    }
}; 

// get all questions 
const getAllQuestions = async (req, res)=>{
  try{
    const questions = await Question.find().populate("user", "name");
    res.json(questions);
  }catch(err){
    res.status(500).json({message:"Serving error"});
  }
}; 

// find question by id 
const findQuestionsById = async (req, res)=>{
 try{
   const questions = await Question.findById(req.params.id).populate("user", "name");
   if (!questions) return res.status(404).json({ message: "Question not found" });

   res.json(questions);
 }catch(err){
    res.status(500).json({message:"Serving error"});
 }
}; 

module.exports = {askQuestion, getAllQuestions, findQuestionsById};