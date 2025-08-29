const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database and OAuth is connected");
    // await mongoose.connect(process.env.MONGODB_URI);
    // console.log("Oauth is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
