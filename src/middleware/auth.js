// middleware/auth.js - JWT Auth Middleware (for protected routes)
// This is a simple JWT verifier; for Next.js App Router, use in API handlers
import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;