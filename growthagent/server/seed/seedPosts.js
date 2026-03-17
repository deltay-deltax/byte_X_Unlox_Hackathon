const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Post = require('../models/Post');
const BrandProfile = require('../models/BrandProfile');
const { posts } = require('./seedPosts.json');
const { brandProfiles } = require('./brandProfiles.json');

dns.setServers(['8.8.8.8']);

dotenv.config();

const seedPosts = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await Post.deleteMany({});
    await BrandProfile.deleteMany({});

    await Post.insertMany(posts);
    await BrandProfile.insertMany(brandProfiles);

    console.log(`✅ ${posts.length} posts seeded`);
    console.log(`✅ ${brandProfiles.length} brand profiles seeded`);
    mongoose.disconnect();
};

seedPosts().catch(console.error);