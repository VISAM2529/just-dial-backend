// src/app/admin/businesses/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';

export default function AllBusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllBusinesses();
  }, []);

  const fetchAllBusinesses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/businesses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (business) => {
    if (business.isVerified) {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">✓ Verified</span>;
    } else if (business.verificationStatus === 'pending') {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">⏳ Pending</span>;
    } else if (business.verificationStatus === 'rejected') {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">✗ Rejected</span>;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab="businesses" setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
   

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">All Businesses</h1>
              <p className="text-gray-600 mt-2">Manage all business registrations</p>
            </div>

            {/* Businesses List */}
            <div className="bg-white rounded-lg shadow">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">All Businesses</h2>
                    <p className="text-sm text-gray-600 mt-1">Total: {businesses.length}</p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-6 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search by business name or owner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading businesses...</div>
              ) : filteredBusinesses.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No businesses found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Owner</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredBusinesses.map((business) => (
                        <tr key={business._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{business.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{business.owner?.name || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{business.category?.name || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{business.phone || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm">{getStatusBadge(business)}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {business.createdAt ? new Date(business.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
