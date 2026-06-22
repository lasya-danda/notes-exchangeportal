const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.register = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const existing = await User.findOne({ email: email.toLowerCase() });

      if (existing) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hash = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email: email.toLowerCase(),
        password: hash
      });

      res.json({
        message: 'Account created successfully! Please login.'
      });

    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({
        error: err.message || 'Registration failed'
      });
    }
  }
];

exports.login = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        email: req.body.email.toLowerCase()
      });

      if (!user) {
        return res.status(400).json({
          error: 'Invalid email or password'
        });
      }

      const ok = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!ok) {
        return res.status(400).json({
          error: 'Invalid email or password'
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({
        message: 'Logged in successfully',
        role: user.role
      });

    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({
        error: 'Login failed'
      });
    }
  }
];

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('_id name email role');

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({ user });

  } catch (err) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });

  res.json({
    message: 'Logged out'
  });
};
