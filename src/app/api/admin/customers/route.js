import connectDB from '@/lib/db';
import User from '@/models/User';
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

    // Fetch all customers (non-admin, non-business-owner users)
    const customers = await User.find({ role: 'customer' })
      .select('-password -resetToken')
      .sort({ createdAt: -1 })
      .limit(200);

    return Response.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);

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
      { message: 'Error fetching customers' },
      { status: 500 }
    );
  }
}
