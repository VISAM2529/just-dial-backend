// app/api/users/settings/route.js
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const getIdFromToken = (req) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
};

export async function PUT(req) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const { settings } = await req.json();

        // We use set to allow partial updates if needed, or just replace the object
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { settings } },
            { new: true }
        ).select('-password');

        return Response.json(user);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
