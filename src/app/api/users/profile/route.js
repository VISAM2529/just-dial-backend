// app/api/users/profile/route.js - GET/PUT /api/users/profile (protected)
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select('-password');
    return Response.json(user);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function PUT(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const updates = await req.json();
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    return Response.json(user);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}