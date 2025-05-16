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
const classifyQuery = require('../classifyQuery');
const searchImage = require('../pse');
const analyzeImage = require('../analyzeimage');
const {getLlamaResponse} = require('../inference');

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


router.post('/users/saveChat', checkTokenMiddleware, async (req, res) => {
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
      messages.forEach((msg) => {
        chat.messages.push({
          userMessage: { text: msg.userMessage.text },
          llmMessage: {
            text: msg.llmMessage.text,
            image: msg.llmMessage.image || null, // Ensure image URL is stored properly
          },
        });
      });
      chat.lastUpdated = Date.now();
    } else {
      // If chat does not exist, create a new one with a new sessionId
      const newSessionId = uuidv4();
      chat = new Chat({
        sessionId: newSessionId,
        title,
        email,
        messages: messages.map((msg) => ({
          userMessage: { text: msg.userMessage.text },
          llmMessage: {
            text: msg.llmMessage.text,
            image: msg.llmMessage.image || null,
          },
        })),
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

    // ✅ Step 1: Classify the query
    const classificationResult = await classifyQuery(text);
    console.log("Raw Classification Result:", classificationResult);

    // ✅ Step 2: Handle casual responses
    if (classificationResult.type === 'Casual') {
      return res.json({ prediction: classificationResult.response });
    }

    // ✅ Step 3: Reject Non-ML Queries
    if (classificationResult.type === 'Non-Machine Learning') {
      return res.json({ 
        prediction: `Sorry I am a Machine Learning Model and i can't answer to this query as it is unrelated to Machine Learning. If you have any ML-related questions, I’d be happy to help!`,
        image: null 
      });
    }

    // ✅ Extract details
    const type = classificationResult.type || 'Error';
    const topic = classificationResult.topic || 'General Machine Learning';
    const searchQuery = classificationResult.searchQuery;
    const needsImage = classificationResult.needsImage || false;

    console.log("Extracted Type:", type);
    console.log("Extracted Topic:", topic);
    console.log("Search Query for Image:", searchQuery);
    console.log("Needs Image:", needsImage);

    let imageUrl = null;
    let imageDescription = "";

    if (needsImage) {
      // ✅ Step 4: Search for an image (Google PSE)
      imageUrl = await searchImage(searchQuery);
      if (imageUrl) {
        // ✅ Step 5: Analyze the image (Gemini Vision)
        imageDescription = await analyzeImage(imageUrl);
      }
    }

    // ✅ Step 6: Generate Groq LLaMA response
    let prompt = `As a machine learning expert, provide a detailed explanation of "${text}". Structure your response clearly, covering key concepts, practical applications, and relevant examples. If the query is unrelated to machine learning, politely refuse to answer.`;

    if (imageDescription) {
      prompt += ` Additionally, analyze this image: ${imageDescription}  add this placeholder for {{image}} and only before explaining image `;
    }

    const prediction = await getLlamaResponse(prompt);

    return res.json({ prediction, image: imageUrl });
  } catch (error) {
    console.error("Error in getRespo:", error);
    res
      .status(500)
      .json({ prediction: "Internal server error", msg: error.message });
  }
});


module.exports = router;
