'use client';

import { useState, useEffect } from 'react';

const PendingBusinessesTable = ({ onSelectBusiness }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Error fetching pending businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Pending Verification</h2>
        <p className="text-sm text-gray-600 mt-1">Businesses awaiting admin verification</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      ) : businesses.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No pending businesses</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{business.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {business.owner?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {business.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {business.category?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => onSelectBusiness(business)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingBusinessesTable;
