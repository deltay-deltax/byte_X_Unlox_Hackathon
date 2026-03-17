const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Helper to call n8n webhooks or fallback to mock data
 */
async function callAgent(url, payload, mockData) {
  if (!url) {
    console.warn('Webhook URL not set, using mock data');
    return mockData;
  }

  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error(`Error calling agent at ${url}:`, error.message);
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

  const result = await callAgent(process.env.PROCESS_PROFILE_URL, { handle, niche }, mockProfile);
  res.json(result);
});

// Generate Post Content
router.post('/generate-post', async (req, res) => {
  const { handle, contentType, goal } = req.body;
  console.log(`Generating ${contentType} for ${handle} with goal ${goal}`);

  const mockPost = {
    handle: handle || "thecrumbstory",
    type: contentType || "Reel",
    caption: `The secret to our fluffy pastries? It's all in the folding technique! 🥐✨\n\nFreshly baked and waiting for you. Come by this morning for that perfect crunch.\n\n#bakery #pastrylove #freshbaked #bangalorefood`,
    hashtags: ["#bakery", "#pastrylove", "#freshbaked", "#bangalorefood"],
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000",
    suggestedMusic: "Lo-fi Bakery Vibes",
    reasoning: "Based on your audience peak at 18:00, this warm and inviting reel will capture afternoon browsers looking for a quick treat."
  };

  const result = await callAgent(process.env.GENERATE_POST_URL, { handle, contentType, goal }, mockPost);
  res.json(result);
});

// Analyse Post Performance
router.post('/analyse', async (req, res) => {
  const { postId, query } = req.body;
  console.log(`Analysing ${postId} with query ${query}`);

  const mockAnalysis = {
    reasoning: "Your last post saw a 24% spike in engagement during the first hour. This was likely due to the high-contrast thumbnail and the relatable caption about 'Monday Mornings'. To replicate this, I suggest using similar warm lighting in your next static post and maintaining the 'homely' tone that your followers engage with most."
  };

  const result = await callAgent(process.env.ANALYSE_URL, { postId, query }, mockAnalysis);
  res.json(result);
});

module.exports = router;

//exporting the fn 