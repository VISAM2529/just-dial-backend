// app/api/admin/businesses/[id]/verify/route.js - POST /api/admin/businesses/:id/verify
import connectDB from '@/lib/db';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function POST(req, { params }) {
  await connectDB();

  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    if (role !== 'admin') {
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { status, reason } = await req.json(); // 'approved' or 'rejected'
    const business = await Business.findById(params.id);
    
    if (!business) {
      return Response.json({ message: 'Business not found' }, { status: 404 });
    }

    business.verificationStatus = status;
    business.isVerified = status === 'approved';
    
    if (status === 'rejected' && reason) {
      business.verificationDenialReason = reason;
    }

    await business.save();
    return Response.json(business);
  } catch (error) {
    console.error('Verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return Response.json({ message: 'Invalid token' }, { status: 401 });
    }
    
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  // Redirect to POST
  return POST(req, { params });
}