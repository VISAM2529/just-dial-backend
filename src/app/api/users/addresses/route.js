// app/api/users/addresses/route.js
import connectDB from '@/lib/db';
import Address from '@/models/Address';
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
        const addresses = await Address.find({ user: userId }).sort({ createdAt: -1 });
        return Response.json(addresses);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 401 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const body = await req.json();

        // Create new address
        const newAddress = await Address.create({ ...body, user: userId });
        return Response.json(newAddress, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Error creating address' }, { status: 500 });
    }
}
