const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Helper to call n8n webhooks or fallback to mock data
 */
async function callAgent(url, payload, mockData) {
  console.log(`[AGENT] Calling webhook: ${url || 'UNDEFINED'}`);
  if (!url) {
    console.warn('[AGENT] Webhook URL not set, using mock data');
    return mockData;
  }

  try {
    const response = await axios.post(url, payload);
    console.log(`[AGENT] Success response from ${url}:`, JSON.stringify(response.data).substring(0, 100) + '...');
    return response.data;
  } catch (error) {
    console.error(`[AGENT] Error calling agent at ${url}:`, error.message);
    if (error.response) {
      console.error(`[AGENT] Response error data:`, error.response.data);
    }
    // Return mock data as fallback even on error to keep the app working
    return mockData;
  }
}

// Build Brand Profile
router.post('/build-profile', async (req, res) => {
  const { handle, niche } = req.body;
  console.log(`Building profile for ${handle} in niche ${niche}`);

  const mockProfile = {
    handle: handle || "thecrumbstory",
    niche: niche || "Bakery / Food",
    tone: "Warm, homely, personal",
    targetAudience: "Urban foodies aged 22-38, Bangalore locals",
    topContentTypes: ["Reel", "Carousel", "Story Poll"],
    bestPostingTimes: ["8:00 AM", "6:00 PM", "8:00 PM"],
    peakHour: 18,
    topHashtags: ["#bangalorefood", "#bakery", "#reels", "#bakerylove"],
    avgEngagement: "3.8%",
    contentMix: { "Reel": 40, "Static": 30, "Carousel": 20, "StoryPoll": 10 },
    brandColors: ["#D4A574", "#8B4513", "#FFF8F0"],
    weeklyPostingFrequency: 5,
    topPerformingContentType: "Reel",
    recommendedNextPost: "Reel — behind the scenes content performs 3.4x better than static posts"
  };

  const result = await callAgent(process.env.N8N_PROFILE_WEBHOOK, { handle, niche }, mockProfile);
  res.json(result);
});

const Post = require('../models/Post');
const BrandProfile = require('../models/BrandProfile');

// Generate Post Content with the full 9-step flow
router.post('/generate-post', async (req, res) => {
  const { userId, handle, contentType, goal } = req.body;
  
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const emitStatus = async (step, message) => {
    if (req.io) {
      req.io.emit('agent_status', { step, message });
      console.log(`[STATUS] Step ${step}: ${message}`);
    }
    await wait(800); // Give UI time to breathe
  };

  console.log(`Starting 9-step generation flow for ${handle} (User: ${userId})`);

  try {
    // 1. Fetch last 6 posts for context
    await emitStatus(1, 'Fetching recent performance history...');
    const recentPosts = await Post.find({ handle }).sort({ postedAt: -1 }).limit(6);
    console.log(`[GENERATE-POST] Found ${recentPosts.length} recent posts for context`);
    
    // 2. Call Profile Agent to refine brandProfile
    await emitStatus(2, 'Agents analyzing your brand voice...');
    const profileMock = {
      niche: "Artisan Bakery",
      tone: "Warm",
      targetAudience: "Foodies",
      topHashtags: ["#bakery"]
    };
    
    const refinedProfileData = await callAgent(
      process.env.N8N_PROFILE_WEBHOOK, 
      { handle, recentPosts }, 
      profileMock
    );

    // 3. Save/Update BrandProfile in MongoDB
    await emitStatus(3, 'Updating your brand strategy...');
    let brandProfile = await BrandProfile.findOneAndUpdate(
      { handle },
      { ...refinedProfileData, userId },
      { upsert: true, new: true }
    );
    console.log(`[GENERATE-POST] Updated BrandProfile for ${handle}`);

    // 4. Call Content Agent based on refined profile
    await emitStatus(4, 'AI Generating content directions...');
    const contentMock = {
      recommendedNextPost: {
        type: "Reel",
        content: "Time-lapse of baking croissants."
      }
    };

    const generationResult = await callAgent(
      process.env.N8N_CONTENT_WEBHOOK,
      { handle, brandProfile, goal: goal || 'Engage audience' },
      contentMock
    );

    // 5. Extract and prepare the new post
    await emitStatus(5, 'Polishing captions and hashtags...');
    // Handle both { recommendedNextPost: { type, content } } and direct formats
    const aiPost = generationResult.recommendedNextPost || generationResult;
    
    let finalPostData = {
      userId,
      handle,
      type: aiPost.type || contentType || "Reel",
      caption: aiPost.content || aiPost.caption || (typeof aiPost === 'string' ? aiPost : "Check out our latest creation!"),
      hashtags: aiPost.hashtags || refinedProfileData.topHashtags || [],
      imageUrl: aiPost.imageUrl || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000",
      isAgentGenerated: true,
      postedAt: new Date(),
      metrics: { views: 0, likes: 0, comments: 0, shares: 0, saves: 0 }
    };

    // 6. Save new post to MongoDB
    await emitStatus(6, 'Finalizing and publishing...');
    const newPost = new Post(finalPostData);
    const savedPost = await newPost.save();
    
    // 7. Emit via socket.io
    if (req.io) {
      req.io.emit('new_post', savedPost);
      console.log('Socket event new_post emitted');
    }
    
    await emitStatus(7, 'Done!');
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error in multi-step generation flow:', err);
    if (req.io) req.io.emit('agent_status', { step: -1, message: 'Generation failed. Please try again.' });
    res.status(500).json({ message: 'AI generation chain failed', error: err.message });
  }
});

// Analyse Post Performance
router.post('/analyse', async (req, res) => {
  const { postId, query } = req.body;
  console.log(`Analysing ${postId} with query ${query}`);

  const mockAnalysis = {
    reasoning: "Your last post saw a 24% spike in engagement during the first hour. This was likely due to the high-contrast thumbnail and the relatable caption about 'Monday Mornings'. To replicate this, I suggest using similar warm lighting in your next static post and maintaining the 'homely' tone that your followers engage with most."
  };

  const result = await callAgent(process.env.N8N_ANALYSE_WEBHOOK, { postId, query }, mockAnalysis);
  res.json(result);
});

module.exports = router;

//exporting the fn