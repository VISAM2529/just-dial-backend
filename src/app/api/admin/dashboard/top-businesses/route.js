// src/app/api/admin/dashboard/top-businesses/route.js
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import Category from '@/models/Category';
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

    // Fetch top rated verified businesses
    const topBusinesses = await Business.find({ isVerified: true })
      .populate('category', 'name')
      .sort({ rating: -1, reviewCount: -1 })
      .limit(5)
      .select('name category rating reviewCount isVerified phone');

    return Response.json(topBusinesses);
  } catch (error) {
    console.error('Error fetching top businesses:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
