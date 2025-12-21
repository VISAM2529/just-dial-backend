'use client';

import { useState, useEffect } from 'react';

const RejectedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    fetchRejectedBusinesses();
  }, []);

  const fetchRejectedBusinesses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/businesses/rejected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching rejected businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Rejected Businesses</h2>
            <p className="text-sm text-gray-600 mt-1">Total rejected: {businesses.length}</p>
          </div>
          <div className="text-red-600 text-3xl">✗</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by business name or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading rejected businesses...</div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          {searchTerm ? 'No rejected businesses found' : 'No rejected businesses'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rejection Reason</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rejected On</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBusinesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{business.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.owner?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-red-700 max-w-xs">
                    <button
                      onClick={() => setSelectedBusiness(business)}
                      className="text-red-600 hover:text-red-800 underline"
                      title={business.verificationDenialReason}
                    >
                      View Reason
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {business.updatedAt ? new Date(business.updatedAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      ✗ Rejected
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reason Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedBusiness.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Owner</label>
                <p className="text-gray-700">{selectedBusiness.owner?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rejection Reason
                </label>
                <p className="text-red-700 bg-red-50 rounded px-3 py-2">
                  {selectedBusiness.verificationDenialReason || 'No reason provided'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Rejected On</label>
                <p className="text-gray-700">
                  {selectedBusiness.updatedAt
                    ? new Date(selectedBusiness.updatedAt).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedBusiness(null)}
              className="w-full mt-6 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedBusinesses;
