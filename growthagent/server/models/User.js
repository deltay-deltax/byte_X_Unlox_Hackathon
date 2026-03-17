const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  handle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profilePic: { type: String },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  niche: { type: String },
  location: { type: String },
  website: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
