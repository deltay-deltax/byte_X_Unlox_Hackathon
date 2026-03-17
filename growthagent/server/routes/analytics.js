const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts + metrics for a user
router.get('/summary/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ postedAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get metrics for one specific post
router.get('/post/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

