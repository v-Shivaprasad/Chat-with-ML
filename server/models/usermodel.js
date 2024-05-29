const mongoose = require('mongoose');
const jwt = require('../node_modules/jsonwebtoken')
require('dotenv').config();
const key = process.env.MONGO_KEY
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  signemail: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  },
});

userSchema.methods.generateToken = async function () {
  try {

    const token = jwt.sign(
      { userName: this.name, email: this.signemail, lastLoggedInDate: formattedDate },
      key,
      { expiresIn: '1h' }
    );

    return token;
  } catch (error) {
    // Handle error (e.g., log it or throw a custom error)
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
