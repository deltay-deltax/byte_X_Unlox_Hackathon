const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { handle, password } = req.body;
  try {
    const user = await User.findOne({ handle });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Minimal security check as requested for hackathon
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ userId: user._id, handle: user.handle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
