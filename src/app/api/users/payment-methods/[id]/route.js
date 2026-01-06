// app/api/users/payment-methods/[id]/route.js
import connectDB from '@/lib/db';
import PaymentMethod from '@/models/PaymentMethod';
import jwt from 'jsonwebtoken';

const getIdFromToken = (req) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
};

export async function DELETE(req, { params }) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const { id } = params;

        const method = await PaymentMethod.findOneAndDelete({ _id: id, user: userId });

        if (!method) return Response.json({ message: 'Payment method not found' }, { status: 404 });
        return Response.json({ message: 'Payment method removed' });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
