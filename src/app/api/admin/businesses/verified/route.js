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

    // Fetch all verified businesses
    const businesses = await Business.find({ isVerified: true })
      .populate('owner', 'name email phone')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(200);

    return Response.json(businesses);
  } catch (error) {
    console.error('Error fetching verified businesses:', error);

    if (error.name === 'TokenExpiredError') {
      return Response.json(
        { message: 'Token expired', code: 'TOKEN_EXPIRED' },
        { status: 401 }
      );
    } else if (error.name === 'JsonWebTokenError') {
      return Response.json(
        { message: 'Invalid token', code: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    return Response.json(
      { message: 'Error fetching verified businesses' },
      { status: 500 }
    );
  }
}
