// scripts/seedAdmin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists`);
      console.log(`You can delete it first with:`);
      console.log(`db.users.deleteOne({ email: "${adminEmail}" })`);
      process.exit(0);
    }

    // Create admin user (password will be hashed by the pre-save hook)
    const admin = new User({
      name: 'Admin User',
      email: adminEmail,
      password: adminPassword, // Don't hash here, let the pre-save hook do it
      role: 'admin',
      verified: true,
      isVerified: true,
      phone: '+91-0000000000',
      address: 'Admin Office',
    });

    await admin.save();
    console.log(`✅ Admin user created successfully!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
