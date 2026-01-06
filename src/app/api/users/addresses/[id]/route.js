// app/api/users/addresses/[id]/route.js
import connectDB from '@/lib/db';
import Address from '@/models/Address';
import jwt from 'jsonwebtoken';

const getIdFromToken = (req) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
};

export async function PUT(req, { params }) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const { id } = params;
        const updates = await req.json();

        const address = await Address.findOneAndUpdate(
            { _id: id, user: userId },
            updates,
            { new: true }
        );

        if (!address) return Response.json({ message: 'Address not found' }, { status: 404 });
        return Response.json(address);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const { id } = params;

        const address = await Address.findOneAndDelete({ _id: id, user: userId });

        if (!address) return Response.json({ message: 'Address not found' }, { status: 404 });
        return Response.json({ message: 'Address deleted' });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
