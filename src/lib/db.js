// This is the full code for the Next.js backend. I'll organize it by files.
// Assume project structure:
// - app/api/ (for API routes using App Router)
// - models/ (for Mongoose schemas)
// - lib/ (for DB connection)
// - middleware/ (for auth)

// First, install dependencies:
// npm install mongoose bcryptjs jsonwebtoken next-auth @next-auth/mongodb-adapter zod

// lib/db.js - DB Connection
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;