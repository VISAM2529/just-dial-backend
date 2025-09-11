import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params; // Booking ID
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return Response.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
  }

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'business_owner') {
      return Response.json({ message: 'Forbidden: Business owner access required' }, { status: 403 });
    }

    const { status } = await req.json();
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return Response.json({ message: 'Invalid status. Must be pending, confirmed, completed, or cancelled' }, { status: 400 });
    }

    // Find the booking
    const booking = await Booking.findById(id).populate('business');
    if (!booking) {
      return Response.json({ message: 'Booking not found' }, { status: 404 });
    }

    // Verify the business belongs to the user
    const business = await Business.findOne({ _id: booking.business._id, owner: userId });
    if (!business) {
      return Response.json({ message: 'Forbidden: You do not own this business' }, { status: 403 });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    // Return updated booking
    const updatedBooking = await Booking.findById(id)
      .populate('customer', 'name')
      .populate('business', 'name');

    return Response.json({
      message: 'Booking status updated successfully',
      booking: updatedBooking,
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating booking status:', error);
    if (error.name === 'JsonWebTokenError') {
      return Response.json({ message: 'Invalid token' }, { status: 401 });
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}