const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const User = require('./models/User');
const Post = require('./models/Post');

dns.setServers(['8.8.8.8']);

dotenv.config();

const fs = require('fs');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({});
  let out = '--- USERS ---\n';
  for (const u of users) {
    const count = await Post.countDocuments({ userId: u._id });
    out += `Handle: ${u.handle} | ID: ${u._id} | Posts: ${count}\n`;
  }
  
  const allPosts = await Post.find({});
  out += '\n--- SAMPLE POST ---\n';
  if (allPosts.length > 0) {
    out += `Post Handle: ${allPosts[0].handle}\n`;
    out += `Post userId: ${allPosts[0].userId}\n`;
    out += `Post userId string: ${allPosts[0].userId.toString()}\n`;
  } else {
    out += 'NO POSTS FOUND IN DB\n';
  }
  
  fs.writeFileSync('db_check_out.txt', out);
  console.log('Results written to db_check_out.txt');
  mongoose.disconnect();
}

check().catch(console.error);
