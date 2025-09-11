// app/api/businesses/route.js - POST/GET /api/businesses (create and search)
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  console.log(token)
  
  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id,role)
    if (role !== 'business_owner') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const data = await req.json();
    console.log(data)
    data.owner = id;
    const business = new Business(data);
    await business.save();
    return Response.json(business, { status: 201 });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  // Add more filters, e.g., geo search if location provided
  const query = {};
  if (category) query.category = category;
  // For geo: if location, use $near

  const businesses = await Business.find(query);
  return Response.json(businesses);
}