'use client';

import { useState, useEffect } from 'react';

const VerifiedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVerifiedBusinesses();
  }, []);

  const fetchVerifiedBusinesses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/businesses/verified', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching verified businesses:', error);
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
            <h2 className="text-lg font-semibold text-gray-900">Verified Businesses</h2>
            <p className="text-sm text-gray-600 mt-1">Total verified: {businesses.length}</p>
          </div>
          <div className="text-green-600 text-3xl">✓</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by business name or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading verified businesses...</div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          {searchTerm ? 'No verified businesses found' : 'No verified businesses yet'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reviews</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBusinesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{business.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.owner?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.category?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-yellow-500 font-semibold">
                      {'⭐'.repeat(Math.floor(business.rating || 0))} ({business.rating || 0})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{business.reviewCount || 0}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
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

export default VerifiedBusinesses;
