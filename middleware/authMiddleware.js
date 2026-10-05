import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Verify user is authenticated (Protect route)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header (Bearer TOKEN_HERE)
      token = req.headers.authorization.split(' ')[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and attach data (excluding password) to req.user
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Check if user is an admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin role required' });
  }
};