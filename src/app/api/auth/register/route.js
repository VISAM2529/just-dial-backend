// app/api/auth/register/route.js - POST /api/auth/register
// NOTE: You need to install nodemailer and bcryptjs if not already installed: npm install nodemailer bcryptjs
// Update your User model in '@/models/User' to include these fields in the schema:
// verified: { type: Boolean, default: false },
// emailOTP: { type: String },
// emailOTPExpiry: { type: Date },
// Assuming your User model already has a pre('save') hook to hash the password with bcrypt.

import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
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
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return Response.json(
        { message: 'Missing fields' }, 
        { status: 400, headers }
      );
    }

    let user = await User.findOne({ email });

    if (user && user.verified) {
      return Response.json(
        { message: 'User exists' }, 
        { status: 400, headers }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    if (!user) {
      // New user
      user = new User({ name, email, password, role, verified: false });
    }

    // Set or update OTP
    user.emailOTP = hashedOTP;
    user.emailOTPExpiry = expiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email for ServiceFinder',
      text: `Your one-time password (OTP) is: ${otp}. It expires in 10 minutes.`,
    });

    return Response.json(
      { message: 'OTP sent to your email' }, 
      { status: 201, headers }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: 'Internal server error' }, 
      { status: 500, headers }
    );
  }
}