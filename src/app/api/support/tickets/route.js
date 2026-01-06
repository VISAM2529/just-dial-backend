// app/api/support/tickets/route.js
import connectDB from '@/lib/db';
import SupportTicket from '@/models/SupportTicket';
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
        const tickets = await SupportTicket.find({ user: userId }).sort({ createdAt: -1 });
        return Response.json(tickets);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 401 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const userId = getIdFromToken(req);
        const body = await req.json();

        const ticket = await SupportTicket.create({ ...body, user: userId });
        return Response.json(ticket, { status: 201 });
    } catch (error) {
        return Response.json({ message: 'Error creating ticket' }, { status: 500 });
    }
}
