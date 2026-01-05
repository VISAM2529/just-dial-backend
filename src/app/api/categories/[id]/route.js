// app/api/categories/[id]/route.js
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import jwt from 'jsonwebtoken';

export async function GET(req, { params }) {
    await connectDB();
    const { id } = await params;
    try {
        const category = await Category.findById(id);
        if (!category) return Response.json({ message: 'Category not found' }, { status: 404 });
        return Response.json(category);
    } catch (err) {
        return Response.json({ message: 'Invalid ID format' }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { role } = jwt.verify(token, process.env.JWT_SECRET);

        // Allow admin and business_owner (as per user request for testing)
        if (role !== 'admin' && role !== 'business_owner') {
            return Response.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { id } = await params;
        const updates = await req.json();

        const category = await Category.findByIdAndUpdate(id, updates, { new: true });

        if (!category) return Response.json({ message: 'Category not found' }, { status: 404 });

        return Response.json(category);
    } catch (err) {
        return Response.json({ message: 'Invalid token or ID' }, { status: 401 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const { role } = jwt.verify(token, process.env.JWT_SECRET);

        // Allow admin and business_owner
        if (role !== 'admin' && role !== 'business_owner') {
            return Response.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { id } = await params;
        await Category.findByIdAndDelete(id);
        return Response.json({ message: 'Category deleted' });
    } catch {
        return Response.json({ message: 'Invalid token' }, { status: 401 });
    }
}
