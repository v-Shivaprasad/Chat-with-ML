const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../Middleware/checkTokenMiddleware');
require('dotenv').config();
const key = process.env.MONGO_KEY;

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
    res.status(200).json({ token, email, ok: true });
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

router.post('/users/logout', checkTokenMiddleware, async (req, res) => {
  try {
    // Optionally handle additional logout actions (e.g., invalidate token)
    res.status(200).json({ msg: 'Logout successful', ok: true });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ msg: 'Internal server error', ok: false });
  }
});

module.exports = router;