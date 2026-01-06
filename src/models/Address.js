// models/Address.js
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    label: { type: String, default: 'Home' }, // e.g., Home, Work
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false },
}, { timestamps: true });

// Ensure only one default address per user
addressSchema.pre('save', async function (next) {
    if (this.isDefault) {
        const Address = mongoose.models.Address || this.constructor;
        await Address.updateMany(
            { user: this.user, _id: { $ne: this._id } },
            { $set: { isDefault: false } }
        );
    }
    next();
});

export default mongoose.models.Address || mongoose.model('Address', addressSchema);
