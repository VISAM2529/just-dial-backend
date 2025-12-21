// app/api/auth/login/route.js - POST /api/auth/login
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 200, headers });
  }

  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' }, 
        { status: 400, headers }
      );
    }

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      console.log(`User not found: ${email}`);
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401, headers }
      );
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401, headers }
      );
    }

    // Validate that the user is logging in with the correct role (if role is provided)
    if (role && user.role !== role) {
      console.log(`Role mismatch. User role: ${user.role}, Requested role: ${role}`);
      return NextResponse.json(
        { message: `Invalid role. Please login as a ${user.role}` }, 
        { status: 403, headers }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    return NextResponse.json(
      { 
        token, 
        userId: user._id, 
        role: user.role,
        name: user.name,
        email: user.email,
        message: 'Login successful' 
      }, 
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500, headers }
    );
  }
}