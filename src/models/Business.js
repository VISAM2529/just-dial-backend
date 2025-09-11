import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: String },
  description: { type: String },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  verificationDenialReason: { type: String }, // New field for denial reason
  responseTime: { type: String, default: '30 mins' },
  priceRange: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
}, { timestamps: true });

businessSchema.index({ location: '2dsphere' });
businessSchema.index({ owner: 1 }); // Index for faster owner-based queries
delete mongoose.models.Business;
export default mongoose.models.Business || mongoose.model('Business', businessSchema);