const express = require('express');
require("dotenv").config;
const cookieParser = require("cookie-parser");
const { dbConnection } = require('./src/config/database');
const userRoute = require('./src/routes/user.route')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/user',userRoute);
dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occurred in server starting process:", err);
  });