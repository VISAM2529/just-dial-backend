// src/components/admin/PendingBusinesses.jsx
'use client';

import { useState, useEffect } from 'react';

const PendingBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchPendingBusinesses();
  }, []);

  const fetchPendingBusinesses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/businesses/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      // Fallback mock data for demonstration
      setBusinesses([
        {
          _id: '1',
          name: 'Plumbing Pros',
          category: 'Plumbing',
          owner: { name: 'John Smith' },
          address: 'Downtown',
          aadharNumber: '****1234',
          aadharFrontImage: 'https://via.placeholder.com/300x200?text=Aadhar+Front',
          aadharBackImage: 'https://via.placeholder.com/300x200?text=Aadhar+Back',
          createdAt: '2023-10-15',
          description: 'Professional plumbing services',
        },
        {
          _id: '2',
          name: 'Electric Solutions',
          category: 'Electrical',
          owner: { name: 'Sarah Johnson' },
          address: 'East Side',
          aadharNumber: '****5678',
          aadharFrontImage: 'https://via.placeholder.com/300x200?text=Aadhar+Front',
          aadharBackImage: 'https://via.placeholder.com/300x200?text=Aadhar+Back',
          createdAt: '2023-10-18',
          description: 'Certified electricians',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/businesses/${id}/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setBusinesses(businesses.filter((b) => b._id !== id));
        setSelectedBusiness(null);
      }
    } catch (error) {
      console.error('Error verifying business:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/businesses/${id}/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected', reason: rejectReason }),
      });

      if (response.ok) {
        setBusinesses(businesses.filter((b) => b._id !== id));
        setSelectedBusiness(null);
        setRejectReason('');
      }
    } catch (error) {
      console.error('Error rejecting business:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading pending businesses...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Business Verifications</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {businesses.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>No pending businesses to verify</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {businesses.map((business) => (
                  <li
                    key={business._id}
                    onClick={() => setSelectedBusiness(business)}
                    className={`px-6 py-4 cursor-pointer transition-colors ${
                      selectedBusiness?._id === business._id
                        ? 'bg-indigo-50 border-l-4 border-indigo-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{business.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Owner: {business.owner?.name || 'N/A'} • {business.category}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{business.address}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Details Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedBusiness ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedBusiness.name}</h3>

                {/* Aadhar Documents */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Aadhar Documents</p>
                  <p className="text-xs text-gray-500 mb-3">Aadhar Number: {selectedBusiness.aadharNumber}</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Front</p>
                      <img
                        src={selectedBusiness.aadharFrontImage}
                        alt="Aadhar Front"
                        className="w-full rounded border border-gray-200"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Back</p>
                      <img
                        src={selectedBusiness.aadharBackImage}
                        alt="Aadhar Back"
                        className="w-full rounded border border-gray-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-3 text-sm mb-6">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{selectedBusiness.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Owner</p>
                    <p className="font-medium text-gray-900">{selectedBusiness.owner?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{selectedBusiness.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Description</p>
                    <p className="font-medium text-gray-900">{selectedBusiness.description || 'N/A'}</p>
                  </div>
                </div>

                {/* Rejection Reason */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason (if rejecting)
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleVerify(selectedBusiness._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedBusiness._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Select a business to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingBusinesses;