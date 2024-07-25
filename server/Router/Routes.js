const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../Middleware/checkTokenMiddleware');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const key = process.env.MONGO_KEY;
const Chat = require('../models/Chatmodel');
const mongoose = require('mongoose');
const axios = require('axios');

// User Signup
router.post('/users/signup', async (req, res) => {
  try {
    const check = await User.findOne({ signemail: req.body.email });
    if (check) {
      return res.status(409).json({ msg: 'Email already exists', ok: false });
    }
    const hashpass = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      signemail: req.body.email,
      password: hashpass,
    });

    const result = await user.save();
    console.log(result);
    res.status(200).json({ user, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

// User Login
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ signemail: email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found', ok: false });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ msg: 'Password does not match', ok: false });
    }
    const token = jwt.sign(
      { userName: user.name, email: user.signemail },
      key,
      { expiresIn: '1h' }
    );
    const sessionId = uuidv4(); // Generate a new session ID on login
    res.status(200).json({ token, email, sessionId, ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

// Check Token Validity
router.post('/auth/checkToken', checkTokenMiddleware, async (req, res) => {
  try {
    res.status(200).json({ msg: 'Token is valid', ok: true });
  } catch (error) {
    console.error('Error checking token:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

// User Logout
router.post('/users/logout', checkTokenMiddleware, async (req, res) => {
  try {
    // Optionally handle additional logout actions (e.g., invalidate token)
    res.status(200).json({ msg: 'Logout successful', ok: true });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

router.post('/users/saveChat', checkTokenMiddleware , async (req, res) => {
  try {
    console.log(req.body);
    const { token, title, messages, chatId } = req.body; // Use chatId instead of sessionId
    const decoded = jwt.verify(token, key);
    const email = decoded.email;
    const user = await User.findOne({ signemail: email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found', ok: false });
    }

    let chat;

    if (chatId) {
      // If chatId is provided, try to find the existing chat by chatId
      chat = await Chat.findById(chatId);
    }

    if (chat) {
      // If chat exists, append new messages
      chat.messages.push(...messages);
      chat.lastUpdated = Date.now();
    } else {
      // If chat does not exist, create a new one with a new sessionId
      const newSessionId = uuidv4();
       chat = new Chat({
        sessionId: newSessionId,
        title,
        email,
        messages,
      });
    }

    await chat.save();

    // Check if chat ID already exists in user's chats array
    const chatIndex = user.chats.findIndex(c => c._id.toString() === chat._id.toString());

    if (chatIndex === -1) {
      // If chat ID does not exist, add it to the user's chats array
      user.chats.push({
        _id: chat._id,
        title: chat.title,
      });
    } else {
      // If chat ID exists, update the title if needed
      user.chats[chatIndex].title = chat.title;
    }

    await user.save();

    res.status(200).json({ msg: 'Chat saved successfully', ok: true, sessionId: chat._id.toString() });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ msg: 'Session expired. Please log in again.', ok: false });
    } else {
      console.error('Error saving chat:', error);
      res.status(500).json({ msg: 'Internal server error', ok: false });
    }
  }
});



router.post('/users/getChatHistory', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, key);
    const email = decoded.email;
    const user = await User.findOne({ signemail: email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found', ok: false });
    }

    const chatHistory = user.chats.map(chat => ({
      chatId: chat._id,
      title: chat.title
    }));

    res.status(200).json({ msg: 'Chat history fetched successfully', ok: true, chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

router.post('/users/getChatDetails', async (req, res) => {
  try {
    const { token, chatId } = req.body;
    const decoded = jwt.verify(token, key);
    const email = decoded.email;
    const user = await User.findOne({ signemail: email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found', ok: false });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found', ok: false });
    }

    res.status(200).json({ msg: 'Chat details fetched successfully', ok: true, chat });
  } catch (error) {
    console.error('Error fetching chat details:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});




router.post('/getRespo', async (req, res) => {
  try {
    const text = req.body.data;
    const response = await axios.post(
      "https://b4f9-34-87-122-129.ngrok-free.app/predict",
      { text: text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let prediction = response.data.prediction;

    res.json({ prediction }); // Send the LLM response back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = router;
