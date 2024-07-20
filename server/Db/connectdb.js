const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB;

const connectDb = async () => {
  try {
    await mongoose.connect(uri,{
      dbName: 'Chat-with-Ml',

    });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
