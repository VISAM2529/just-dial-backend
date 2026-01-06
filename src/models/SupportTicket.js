// models/SupportTicket.js
import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    responses: [{
        responder: { type: String }, // 'Admin' or 'User'
        message: { type: String },
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export default mongoose.models.SupportTicket || mongoose.model('SupportTicket', supportTicketSchema);
