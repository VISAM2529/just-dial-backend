import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function POST(req, { params }) {
  await connectDB();
  const { id } = params; // Business ID from URL
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return Response.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
  }

  try {
    // Verify token and check admin role
    // const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    // if (role !== 'admin') {
    //   return Response.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
    // }

    // Parse request body
    const { status, denialReason } = await req.json();

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return Response.json({ message: 'Invalid status. Must be "approved" or "rejected"' }, { status: 400 });
    }

    // Validate denialReason for rejected status
    if (status === 'rejected' && !denialReason) {
      return Response.json({ message: 'Denial reason is required when status is rejected' }, { status: 400 });
    }

    // Find the business
    const business = await Business.findById(id);
    if (!business) {
      return Response.json({ message: 'Business not found' }, { status: 404 });
    }

    // Update business fields
    business.verificationStatus = status;
    business.isVerified = status === 'approved';
    business.verificationDenialReason = status === 'rejected' ? denialReason : null;

    // Save the updated business
    await business.save();

    // Populate category for consistent response
    const updatedBusiness = await Business.findById(id).populate('category');

    return Response.json({
      message: `Business ${status} successfully`,
      business: updatedBusiness,
    }, { status: 200 });
  } catch (error) {
    console.error('Error verifying business:', error);
    if (error.name === 'JsonWebTokenError') {
      return Response.json({ message: 'Invalid token' }, { status: 401 });
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}