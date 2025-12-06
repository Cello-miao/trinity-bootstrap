const express = require('express');
const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyToken,
} = require('../middleware/auth');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({ username, email, password });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Refresh token
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  const newAccessToken = generateAccessToken(decoded.userId);
  res.json({ accessToken: newAccessToken });
});

// Get current user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
