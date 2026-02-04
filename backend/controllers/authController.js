const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  sendValidationError,
  sendConflictError,
  sendAuthError,
  sendServerError,
} = require('../utils/errorHandler');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendValidationError(res, 'Name, email, and password are required');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendConflictError(res, 'Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendValidationError(res, 'Email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return sendAuthError(res, 'Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendAuthError(res, 'Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful', token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    sendServerError(res, error);
  }
};
