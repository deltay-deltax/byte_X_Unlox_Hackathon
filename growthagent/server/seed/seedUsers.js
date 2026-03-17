const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const dns = require('dns');
const User = require('../models/User');
const { users } = require('./seedData.json');

dns.setServers(['8.8.8.8']);

dotenv.config();

const seedUsers = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});

    const hashed = await Promise.all(users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
    })));

    await User.insertMany(hashed);
    console.log(`✅ ${hashed.length} users seeded`);
    mongoose.disconnect();
};

seedUsers().catch(console.error);