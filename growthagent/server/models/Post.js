const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  handle: { type: String },
  type: { type: String },
  caption: { type: String },
  hashtags: [{ type: String }],
  imageUrl: { type: String },
  postedAt: { type: Date },
  isAgentGenerated: { type: Boolean, default: false },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    engagementRate: { type: String },
    hourlyReach: [{ type: Number }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
