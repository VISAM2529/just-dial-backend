// app/api/reviews/route.js - POST /api/reviews
import connectDB from '@/lib/db';
import Review from '@/models/Review';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: customerId, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'customer') return Response.json({ message: 'Forbidden' }, { status: 403 });

    const data = await req.json();
    data.customer = customerId;
    const review = new Review(data);
    await review.save();

    // Update business rating
    const reviews = await Review.find({ business: data.business });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Business.findByIdAndUpdate(data.business, { rating: avgRating, reviewCount: reviews.length });

    return Response.json(review, { status: 201 });
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}