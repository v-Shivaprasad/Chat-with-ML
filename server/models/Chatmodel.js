const mongoose = require('mongoose');

const messagePairSchema = new mongoose.Schema({
  userMessage: {
    text: { type: String, required: true },
  },
  llmMessage: {
    text: { type: String, required: true },
  }
});

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  sessionId: { type: String, required: true , unique: true }, 
  messages: { type: [messagePairSchema], required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
