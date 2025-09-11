import axios from 'axios';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const { data: pendingBusinesses } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/businesses/pending`,
    { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } }
  );
  console.log("session = ", session);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <img
            src="/logo.png" // Replace with actual Abhinnati logo path
            alt="Abhinnati Logo"
            className="h-10 w-auto mr-3"
          />
          <h1 className="text-3xl font-semibold text-gray-800">Abhinnati Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-medium text-gray-700">Pending Businesses</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{pendingBusinesses.length}</p>
            <Link
              href="/admin/businesses/pending"
              className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
            >
              View Pending &rarr;
            </Link>
          </div>
          {/* Placeholder for additional stats cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-medium text-gray-700">Active Users</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">N/A</p>
            <Link
              href="/admin/users"
              className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
            >
              View Users &rarr;
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-medium text-gray-700">Total Revenue</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">N/A</p>
            <Link
              href="/admin/revenue"
              className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
            >
              View Revenue &rarr;
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          Secured by <span className="font-medium text-indigo-600">Abhinnati</span>
        </p>
      </div>
    </div>
  );
}