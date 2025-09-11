// app/api/admin/businesses/[id]/verify/route.js - PUT /api/admin/businesses/:id/verify
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'admin') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const { status } = await req.json(); // 'approved' or 'rejected'
    const business = await Business.findById(params.id);
    if (!business) return Response.json({ message: 'Not found' }, { status: 404 });

    business.verificationStatus = status;
    business.isVerified = status === 'approved';
    await business.save();
    return Response.json(business);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}