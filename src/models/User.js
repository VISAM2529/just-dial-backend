// models/User.js - User Schema
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['customer', 'business_owner', 'admin'], required: true },
  avatar: { type: String },
  membershipTier: { type: String, default: 'Basic' },
  joinedDate: { type: Date, default: Date.now },
  totalSpent: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  verified: { type: Boolean, default: false },
emailOTP: { type: String },
emailOTPExpiry: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
delete mongoose.models.User
export default mongoose.models.User || mongoose.model('User', userSchema);