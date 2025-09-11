// app/api/bookings/[id]/route.js - PUT/DELETE /api/bookings/:id
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const booking = await Booking.findById(params.id).populate('business');
    if (!booking) return Response.json({ message: 'Not found' }, { status: 404 });

    const isOwner = role === 'business_owner' && booking.business.owner.toString() === userId;
    const isCustomer = role === 'customer' && booking.customer.toString() === userId;
    if (!isOwner && !isCustomer) return Response.json({ message: 'Forbidden' }, { status: 403 });

    const updates = await req.json();
    Object.assign(booking, updates);
    await booking.save();
    return Response.json(booking);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const booking = await Booking.findById(params.id).populate('business');
    if (!booking) return Response.json({ message: 'Not found' }, { status: 404 });

    const isOwner = role === 'business_owner' && booking.business.owner.toString() === userId;
    const isCustomer = role === 'customer' && booking.customer.toString() === userId;
    if (!isOwner && !isCustomer) return Response.json({ message: 'Forbidden' }, { status: 403 });

    await booking.deleteOne();
    return Response.json({ message: 'Deleted' });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}