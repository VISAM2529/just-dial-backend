// app/api/quick-search/route.js
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Business from '@/models/Business'; // Ensure model is registered
import jwt from 'jsonwebtoken';

export async function GET(req) {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];

    // If no token, return empty list (or could return generic popular items)
    if (!token) {
        return Response.json([]);
    }

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch last 10 bookings for this user
        const recentBookings = await Booking.find({ customer: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('business')
            .exec();

        // Deduplicate businesses
        const uniqueBusinesses = [];
        const seenIds = new Set();

        recentBookings.forEach(booking => {
            if (booking.business && !seenIds.has(booking.business._id.toString())) {
                seenIds.add(booking.business._id.toString());
                // Simplify the object for the UI "Quick Search" chips
                uniqueBusinesses.push({
                    _id: booking.business._id,
                    name: booking.business.name,
                    category: booking.business.category,
                    image: booking.business.images?.[0] || null,
                    lastBooked: booking.createdAt
                });
            }
        });

        return Response.json(uniqueBusinesses);
    } catch (err) {
        console.error('Quick Search Error:', err);
        // Return empty array on error instead of crashing UI
        return Response.json([]);
    }
}
