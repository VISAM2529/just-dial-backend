// app/api/categories/route.js - GET /api/categories
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import jwt from 'jsonwebtoken';
export async function GET() {
  await connectDB();
  const categories = await Category.find({});
  return Response.json(categories);
}



export async function POST(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'admin') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const data = await req.json();
    const category = new Category(data);
    await category.save();
    return Response.json(category, { status: 201 });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}