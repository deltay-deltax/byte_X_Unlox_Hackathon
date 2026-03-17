const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts for a handle
router.get('/:handle', async (req, res) => {
  try {
    const posts = await Post.find({ handle: req.params.handle }).sort({ postedAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const postData = req.body;
  try {
    const newPost = new Post({
      ...postData,
      postedAt: new Date()
    });
    const savedPost = await newPost.save();
    
    // Emit via socket.io
    req.io.emit('newPost', savedPost);
    
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
