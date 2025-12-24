import connectDB from '@/lib/db';
import Business from '@/models/Business';
import Category from '@/models/Category';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();

  try {
    // const token = req.headers.get('authorization')?.split(' ')[1];
    // if (!token) {
    //   return Response.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    // const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch pending businesses
    const businesses = await Business.find({ verificationStatus: 'pending' })
      .populate('owner', 'name email phone')
      .populate('category', 'name')
      .limit(50);

    return Response.json(businesses);
  } catch (error) {
    console.error('Error fetching pending businesses:', error);

    if (error.name === 'TokenExpiredError') {
      return Response.json(
        {
          message: 'Token expired',
          code: 'TOKEN_EXPIRED',
          expiredAt: error.expiredAt,
        },
        { status: 401 }
      );
    } else if (error.name === 'JsonWebTokenError') {
      return Response.json(
        {
          message: 'Invalid token',
          code: 'INVALID_TOKEN',
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: 'Authentication failed',
        code: 'AUTH_FAILED',
      },
      { status: 401 }
    );
  }
}