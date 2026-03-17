const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// GET /api/analytics/summary/:userId
router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ userId }).sort({ postedAt: -1 });

    if (!posts || posts.length === 0) {
      return res.json({ userId, posts: [], totalMetrics: null });
    }

    const totalMetrics = {
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      totalSaves: 0,
      avgEngagement: '0%',
    };

    posts.forEach((post) => {
      if (post.metrics) {
        totalMetrics.totalViews += post.metrics.views || 0;
        totalMetrics.totalLikes += post.metrics.likes || 0;
        totalMetrics.totalComments += post.metrics.comments || 0;
        totalMetrics.totalShares += post.metrics.shares || 0;
        totalMetrics.totalSaves += post.metrics.saves || 0;
      }
    });

    if (totalMetrics.totalViews > 0) {
      const totalEngagement =
        totalMetrics.totalLikes +
        totalMetrics.totalComments +
        totalMetrics.totalShares;

      const avgEng = (
        (totalEngagement / totalMetrics.totalViews) *
        100
      ).toFixed(1);

      totalMetrics.avgEngagement = `${avgEng}%`;
    }

    res.json({ userId, posts, totalMetrics });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/analytics/post/:postId
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      postId: post._id,
      handle: post.handle,
      caption: post.caption,
      type: post.type,
      metrics: post.metrics || {},
      postedAt: post.postedAt,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;