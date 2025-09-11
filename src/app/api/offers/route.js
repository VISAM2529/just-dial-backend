// app/api/offers/route.js - POST/GET /api/offers
import connectDB from '@/lib/db';
import Offer from '@/models/Offer';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'business_owner') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const data = await req.json();
    data.business = data.business; // Assume sent, verify ownership if needed
    const offer = new Offer(data);
    await offer.save();
    return Response.json(offer, { status: 201 });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const business = searchParams.get('business');
  const query = business ? { business } : {};
  const offers = await Offer.find(query).populate('business');
  return Response.json(offers);
}