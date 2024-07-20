const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB;

const connectDb = async () => {
  try {
    await mongoose.connect(uri,{
      dbName: 'Ml', // Change the database name here

    });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDb;
