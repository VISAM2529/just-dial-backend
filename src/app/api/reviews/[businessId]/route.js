// app/api/reviews/[businessId]/route.js - GET /api/reviews/:businessId
import connectDB from '@/lib/db';
import Review from '@/models/Review';

export async function GET(req, { params }) {
  await connectDB();
  const reviews = await Review.find({ business: params.businessId }).populate('customer', 'name avatar');
  return Response.json(reviews);
}