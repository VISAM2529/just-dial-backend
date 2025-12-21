// scripts/deleteAdmin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;

    const result = await User.deleteOne({ email: adminEmail });
    
    if (result.deletedCount > 0) {
      console.log(`✅ Admin user deleted: ${adminEmail}`);
    } else {
      console.log(`❌ No admin user found with email: ${adminEmail}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting admin:', error);
    process.exit(1);
  }
};

deleteAdmin();
