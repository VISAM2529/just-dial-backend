// app/api/auth/verify-email/route.js - POST /api/auth/verify-email
// Create this new file.

import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return Response.json(
        { message: 'Missing fields' }, 
        { status: 400, headers }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { message: 'User not found' }, 
        { status: 404, headers }
      );
    }

    if (user.verified) {
      return Response.json(
        { message: 'User already verified' }, 
        { status: 400, headers }
      );
    }

    if (Date.now() > user.emailOTPExpiry) {
      return Response.json(
        { message: 'OTP expired' }, 
        { status: 400, headers }
      );
    }

    const isMatch = await bcrypt.compare(otp, user.emailOTP);
    if (!isMatch) {
      return Response.json(
        { message: 'Invalid OTP' }, 
        { status: 400, headers }
      );
    }

    // Verify user
    user.verified = true;
    user.emailOTP = undefined;
    user.emailOTPExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    return Response.json(
      { token, userId: user._id }, 
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Verification error:', error);
    return Response.json(
      { message: 'Internal server error' }, 
      { status: 500, headers }
    );
  }
}