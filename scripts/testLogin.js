// scripts/testLogin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    console.log(`\n🔍 Testing login for: ${email}`);

    // Find the user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log(`✅ User found: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Email: ${user.email}`);

    // Test password comparison
    const isValid = await user.comparePassword(password);
    console.log(`\n🔐 Password test: ${isValid ? '✅ VALID' : '❌ INVALID'}`);

    if (isValid) {
      console.log(`\n✅ Login test PASSED!`);
      console.log(`You can now login with:`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.log(`\n❌ Password mismatch! Password stored doesn't match the one provided.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testLogin();
