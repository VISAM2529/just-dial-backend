// models/PaymentMethod.js
import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['card', 'upi'], required: true },
    provider: { type: String }, // e.g., Visa, HDFC, GPay
    last4: { type: String }, // For cards
    upiId: { type: String }, // For UPI
    expiry: { type: String }, // MM/YY for cards
    isDefault: { type: Boolean, default: false },
}, { timestamps: true });

// Ensure only one default payment method per user
paymentMethodSchema.pre('save', async function (next) {
    if (this.isDefault) {
        const PaymentMethod = mongoose.models.PaymentMethod || this.constructor;
        await PaymentMethod.updateMany(
            { user: this.user, _id: { $ne: this._id } },
            { $set: { isDefault: false } }
        );
    }
    next();
});

export default mongoose.models.PaymentMethod || mongoose.model('PaymentMethod', paymentMethodSchema);
