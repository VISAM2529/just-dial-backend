// app/api/admin/businesses/pending/route.js - GET /api/admin/businesses/pending (admin only)
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  console.log("token = ",token)
//   if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("role=",role)
    if (role !== 'admin') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const businesses = await Business.find({ verificationStatus: 'pending' });
    console.log(businesses)
    return Response.json(businesses);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}