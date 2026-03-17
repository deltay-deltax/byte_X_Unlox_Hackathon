const mongoose = require('mongoose');

const BrandProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  handle: { type: String },
  niche: { type: String },
  tone: { type: String },
  targetAudience: { type: String },
  topContentTypes: [{ type: String }],
  bestPostingTimes: [{ type: String }],
  peakHour: { type: Number },
  topHashtags: [{ type: String }],
  avgEngagement: { type: String },
  contentMix: { type: Map, of: Number },
  brandColors: [{ type: String }],
  weeklyPostingFrequency: { type: Number },
  topPerformingContentType: { type: String },
  recommendedNextPost: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('BrandProfile', BrandProfileSchema);
