// src/components/admin/TopProducts.jsx
'use client';

import { useState, useEffect } from 'react';

const TopProducts = () => {
  const [businesses, setBusinesses] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchTopBusinesses();
  }, []);

  const fetchTopBusinesses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/dashboard/top-businesses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      // Mock data for demonstration
      setBusinesses([
        { _id: '1', name: 'Plumbing Pros', category: 'Plumbing', rating: 4.8, reviewCount: 45, isVerified: true, phone: '+91-9876543210' },
        { _id: '2', name: 'Electric Solutions', category: 'Electrical', rating: 4.6, reviewCount: 38, isVerified: true, phone: '+91-9876543211' },
        { _id: '3', name: 'Home Cleaning', category: 'Cleaning', rating: 4.5, reviewCount: 52, isVerified: true, phone: '+91-9876543212' },
        { _id: '4', name: 'Carpentry Masters', category: 'Carpentry', rating: 4.7, reviewCount: 41, isVerified: false, phone: '+91-9876543213' },
        { _id: '5', name: 'Painting Experts', category: 'Painting', rating: 4.4, reviewCount: 28, isVerified: true, phone: '+91-9876543214' },
      ]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Rated Businesses</h3>
        <div className="flex gap-2">
          <button className="text-sm text-gray-500 hover:text-gray-700">Sort</button>
          <button className="text-sm text-gray-500 hover:text-gray-700">Filter</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Business Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reviews</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      {business.name.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-900 font-medium">{business.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{business.category}</td>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  <div className="flex items-center gap-1">
                    <span>⭐ {business.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{business.reviewCount}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    business.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {business.isVerified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{business.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
