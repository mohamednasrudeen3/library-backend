// Backend: authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const JWT_SECRET = 'your_jwt_secret';

const authMiddleware = async(req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("middle: ",token)
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded: ",decoded)
    const user = await User.findById(decoded.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorize,
};