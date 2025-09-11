// models/Offer.js - Offer Schema
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  title: { type: String, required: true },
  subtitle: { type: String },
  code: { type: String },
  validUntil: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', offerSchema);