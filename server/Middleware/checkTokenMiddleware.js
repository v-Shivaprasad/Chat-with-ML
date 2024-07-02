const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.MONGO_KEY;

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied!' });
  }
  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid!' });
  }
};

module.exports = checkTokenMwiddleware;
