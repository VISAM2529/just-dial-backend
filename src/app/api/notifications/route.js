// app/api/notifications/route.js
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';
import jwt from 'jsonwebtoken';

// GET: Fetch user's notifications
export async function GET(req) {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const notifications = await Notification.find({ user: id }).sort({ createdAt: -1 });
        return Response.json(notifications);
    } catch (error) {
        return Response.json({ message: 'Error fetching notifications' }, { status: 500 });
    }
}
