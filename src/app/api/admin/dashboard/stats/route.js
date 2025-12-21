// src/app/api/admin/dashboard/stats/route.js
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import User from '@/models/User';
import Booking from '@/models/Booking';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();

  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    if (role !== 'admin') {
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Fetch statistics
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const verifiedBusinesses = await Business.countDocuments({ isVerified: true });
    const pendingVerification = await Business.countDocuments({ verificationStatus: 'pending' });
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Business.aggregate([
      { $group: { _id: null, totalReviews: { $sum: '$reviewCount' } } }
    ]);

    const stats = {
      totalUsers,
      totalBusinesses,
      verifiedBusinesses,
      rejectedBusinesses: await Business.countDocuments({ verificationStatus: 'rejected' }),
      pendingVerification,
      totalBookings,
      totalReviews: totalReviews[0]?.totalReviews || 0,
      averageRating: await Business.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ]).then(res => res[0]?.avgRating?.toFixed(2) || 0),
    };

    return Response.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
