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

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const { id } = params;

    // Find the business
    const business = await Business.findById(id);
    if (!business) {
      return Response.json({ message: 'Business not found' }, { status: 404 });
    }

    // Check if user is the owner or admin
    const isOwner = business.owner.toString() === userId;
    const isAdmin = decodedToken.role === 'admin';

    if (!isOwner && !isAdmin) {
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Only allow resubmission if business was previously rejected
    if (business.verificationStatus !== 'rejected') {
      return Response.json(
        { message: 'Business can only be resubmitted if it was previously rejected' },
        { status: 400 }
      );
    }

    // Reset verification status to pending
    business.verificationStatus = 'pending';
    business.verificationDenialReason = null;

    await business.save();

    return Response.json({
      message: 'Business resubmitted for verification',
      business: {
        id: business._id,
        name: business.name,
        verificationStatus: business.verificationStatus,
      },
    });
  } catch (error) {
    console.error('Error resubmitting business:', error);

    if (error.name === 'TokenExpiredError') {
      return Response.json(
        { message: 'Token expired', code: 'TOKEN_EXPIRED' },
        { status: 401 }
      );
    } else if (error.name === 'JsonWebTokenError') {
      return Response.json(
        { message: 'Invalid token', code: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    return Response.json(
      { message: 'Error resubmitting business' },
      { status: 500 }
    );
  }
}
