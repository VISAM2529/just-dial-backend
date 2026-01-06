// app/api/users/payment-methods/route.js
import connectDB from '@/lib/db';
import PaymentMethod from '@/models/PaymentMethod';
import jwt from 'jsonwebtoken';

const getIdFromToken = (req) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
};

export async function GET(req) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const methods = await PaymentMethod.find({ user: userId }).sort({ createdAt: -1 });
        return Response.json(methods);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 401 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const body = await req.json();

        const newMethod = await PaymentMethod.create({ ...body, user: userId });
        return Response.json(newMethod, { status: 201 });
    } catch (error) {
        return Response.json({ message: 'Error adding payment method' }, { status: 500 });
    }
}
