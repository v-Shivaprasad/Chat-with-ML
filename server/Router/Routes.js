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

// Chat Saving Route
router.post('/users/saveChat', async (req, res) => {
  try {
    const { email, title, messages, sessionId } = req.body;

    const user = await User.findOne({ signemail: email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found', ok: false });
    }

    let chat;

    if (sessionId) {
      // If sessionId is provided, try to find the existing chat by sessionId
      chat = await Chat.findOne({ sessionId });
    }

    if (chat) {
      // If chat exists, append new messages
      chat.messages.push(...messages);
      chat.lastUpdated = Date.now();
    } else {
      // If chat does not exist, create a new one with a new sessionId
      const newSessionId = sessionId || uuidv4();
      chat = new Chat({
        sessionId: newSessionId,
        title,
        email,
        messages,
      });
    }

    await chat.save();

    res.status(200).json({ msg: 'Chat saved successfully', ok: true, sessionId: chat.sessionId });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

// Fetch Chat History
router.get('/users/getChatHistory/:sessionId', checkTokenMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat history not found', ok: false });
    }

    res.status(200).json({ message: 'Chat history retrieved successfully', ok: true, chat });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Internal server error', ok: false });
  }
});

module.exports = router;
