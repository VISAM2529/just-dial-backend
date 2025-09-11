import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Business from '@/models/Business';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const upcoming = searchParams.get('upcoming') === 'true';

    let query = {};
    if (role === 'customer') {
      query.customer = userId;
    } else if (role === 'business_owner') {
      const businesses = await Business.find({ owner: userId }).select('_id');
      query.business = { $in: businesses.map(b => b._id) };
    } else {
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    if (status) query.status = status;
    if (upcoming) query.date = { $gte: new Date() };

    const bookings = await Booking.find(query);
    return Response.json(bookings);
  } catch {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(req) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id: userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'customer') {
      return Response.json({ message: 'Only customers can create bookings' }, { status: 403 });
    }

    const { businessId, date, time, service, duration, price, notes } = await req.json();

    // Validate required fields
    if (!businessId || !date || !time || !service) {
      return Response.json({ message: 'Missing required fields: businessId, date, time, and service are required' }, { status: 400 });
    }

    // Validate business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return Response.json({ message: 'Business not found' }, { status: 404 });
    }

    // Create booking
    const booking = new Booking({
      business: businessId,
      customer: userId,
      date: new Date(date),
      time,
      service,
      status: 'pending',
      duration: duration || undefined,
      price: price || undefined,
      notes: notes || undefined,
    });

    await booking.save();
    return Response.json(booking, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Invalid token or server error' }, { status: 401 });
  }
}