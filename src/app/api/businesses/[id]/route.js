// app/api/businesses/[id]/route.js - GET/PUT/DELETE /api/businesses/:id
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function GET(req, { params }) {
  await connectDB();
  const business = await Business.findById(params.id).populate('category');
  if (!business) return Response.json({ message: 'Not found' }, { status: 404 });
  return Response.json(business);
}

export async function PUT(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    const business = await Business.findById(params.id);
    if (!business || business.owner.toString() !== userId) return Response.json({ message: 'Forbidden' }, { status: 403 });

    const updates = await req.json();
    Object.assign(business, updates);
    await business.save();
    return Response.json(business);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    const business = await Business.findById(params.id);
    if (!business || business.owner.toString() !== userId) return Response.json({ message: 'Forbidden' }, { status: 403 });

    await business.deleteOne();
    return Response.json({ message: 'Deleted' });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}