import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return Response.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
  }

  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'business_owner') {
      return Response.json({ message: 'Forbidden: Business owner access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query = { status };

    // Find businesses owned by the user
    const businesses = await Business.find({ owner: id }).select('_id');
    const businessIds = businesses.map((b) => b._id);

    // Fetch bookings for those businesses
    const bookingsQuery = { business: { $in: businessIds } };
    if (status) bookingsQuery.status = status;

    const bookings = await Booking.find(bookingsQuery)
      .populate('customer', 'name')
      .populate('business', 'name')
      .sort({ date: -1, time: -1 });

    return Response.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    if (error.name === 'JsonWebTokenError') {
      return Response.json({ message: 'Invalid token' }, { status: 401 });
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}