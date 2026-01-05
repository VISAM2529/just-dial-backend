// app/api/categories/route.js - GET /api/categories
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  console.log('GET /api/categories hit');
  if (req) {
    try {
      const authHeader = req.headers.get('authorization');
      console.log('GET Authorization Header:', authHeader ? `[Present, length: ${authHeader.length}]` : '[Missing]');
      // Be careful logging the full token in prod, but for debug it's useful to see if it has weird chars
      if (authHeader) console.log('GET Auth Header Content (safe substr):', authHeader.substring(0, 20) + '...');
    } catch (e) {
      console.error('Error reading headers in GET:', e);
    }
  }
  const categories = await Category.find({});
  console.log(`Found ${categories.length} categories`);
  return Response.json(categories);
}



export async function POST(req) {
  await connectDB();
  console.log('POST /api/categories hit');
  const authHeader = req.headers.get('authorization');
  console.log('POST Authorization Header:', authHeader);

  if (!authHeader) {
    console.log('Missing Token');
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    const { role } = decoded;

    // Allow both admin and business_owner to create categories for testing
    if (role !== 'admin' && role !== 'business_owner') {
      console.log('Forbidden: Role is', role);
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    console.log('POST Data:', data);
    const category = new Category(data);
    await category.save();
    console.log('Category saved');
    return Response.json(category, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/categories:', err.message);
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}