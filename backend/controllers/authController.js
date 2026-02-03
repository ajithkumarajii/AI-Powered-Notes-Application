const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  sendValidationError,
  sendConflictError,
  sendAuthError,
  sendServerError,
} = require('../utils/errorHandler');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return sendValidationError(res, 'Name, email, and password are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendConflictError(res, 'Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendValidationError(res, 'Email and password are required');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return sendAuthError(res, 'Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendAuthError(res, 'Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};
