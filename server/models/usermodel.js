const mongoose = require('mongoose');
const jwt = require('../node_modules/jsonwebtoken')
require('dotenv').config();
const key = process.env.MONGO_KEY
const userSchema = new mongoose.Schema({
  signemail: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required: true,
  },
  chats:[{
    _id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Chat',  
      required: true, 
    },
    title:{
      type:String,
      required: true,
    }
  }]
});
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
userSchema.methods.generateToken = async function () {
  try {
    const formattedDate = formatDate(new Date());
    const token = jwt.sign(
      { userName: this.name, email: this.signemail, lastLoggedInDate: formattedDate },
      key,
      { expiresIn: '1d' }
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
