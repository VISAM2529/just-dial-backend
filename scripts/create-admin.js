const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'business_owner', 'admin'], default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const args = process.argv.slice(2);
        const email = args[0] || 'admin@example.com';
        const password = args[1] || 'admin123';

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log('Admin user already exists:', email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name: 'System Admin',
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
