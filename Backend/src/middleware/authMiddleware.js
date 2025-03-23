// src/middleware/authMiddleware.js
const protect = (req, res, next) => {
    console.log("Auth middleware working!");
    next();
  };
  
  module.exports = { protect };
  