const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');

// Get all posts + metrics for a user
router.get('/summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let query = { userId };

    // Try finding by ObjectId first
    if (mongoose.Types.ObjectId.isValid(userId)) {
      query = { userId: new mongoose.Types.ObjectId(userId) };
    }

    let posts = await Post.find(query).sort({ postedAt: -1 });

    // Fallback: If no posts by userId, try matching by handle (useful if IDs are inconsistent in demo data)
    if (posts.length === 0) {
      const user = await require('../models/User').findById(userId);
      if (user) {
        posts = await Post.find({ handle: user.handle }).sort({ postedAt: -1 });
      }
    }
    
    // Calculate total metrics
    const totalMetrics = posts.reduce((acc, post) => {
      acc.totalViews += (Number(post.metrics?.views) || 0);
      acc.totalLikes += (Number(post.metrics?.likes) || 0);
      acc.totalComments += (Number(post.metrics?.comments) || 0);
      acc.totalShares += (Number(post.metrics?.shares) || 0);
      acc.totalSaves += (Number(post.metrics?.saves) || 0);
      return acc;
    }, { totalViews: 0, totalLikes: 0, totalComments: 0, totalShares: 0, totalSaves: 0 });

    // Calculate Engagement Rate (Likes + Comments / Views)
    const totalEngagements = totalMetrics.totalLikes + totalMetrics.totalComments;
    totalMetrics.avgEngagement = totalMetrics.totalViews > 0 
      ? ((totalEngagements / totalMetrics.totalViews) * 100).toFixed(1) + '%' 
      : '0%';

    res.json({
      posts,
      totalMetrics
    });
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

