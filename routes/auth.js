const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Op } = require('sequelize');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt for email:', req.body.email);
    
    const user = await User.findOne({
      where: {
        email: { [Op.iLike]: req.body.email }
      }
    });
    
    console.log('User search result:', user ? user.toJSON() : 'Not found');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).send({ error: 'User not found' });
    }
    
    console.log('User found:', user.toJSON());
    
    const isPasswordValid = await user.isValidPassword(req.body.password);
    console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).send({ error: 'Invalid password' });
    }
    
    console.log('Password valid, generating token');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).send({ error: 'Login failed', details: error.message });
  }
});

module.exports = router;