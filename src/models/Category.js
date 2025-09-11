// models/Category.js - Category Schema
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  gradient: [{ type: String }],
  subcategories: [{ type: String }],
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);