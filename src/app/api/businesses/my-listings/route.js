// app/api/businesses/my-listings/route.js
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'business_owner') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const query = { owner: id };
    if (status) query.verificationStatus = status;

    const businesses = await Business.find(query).populate('category');
    return Response.json(businesses);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}