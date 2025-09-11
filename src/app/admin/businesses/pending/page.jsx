'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function PendingBusinesses() {
  const { data: session, status } = useSession();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('PendingBusinesses Session:', {
        accessToken: session?.user?.accessToken,
        role: session?.user?.role,
      });

      const fetchBusinesses = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/businesses/pending`,
            {
              headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
            }
          );
          setBusinesses(res.data);
        } catch (err) {
          console.error('Fetch Businesses Error:', err.response?.data || err.message);
          setError(err.response?.data?.message || 'Failed to fetch businesses');
        } finally {
          setLoading(false);
        }
      };
      fetchBusinesses();
    } else if (status === 'unauthenticated') {
      setError('Not authenticated');
      setLoading(false);
    }
  }, [status, session]);

  const handleVerify = async (id, status) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/businesses/${id}/verify`,
        { status },
        { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } }
      );
      setBusinesses(businesses.filter((b) => b._id !== id));
      alert(`Business ${status}`);
    } catch (err) {
      console.error('Verify Business Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update business');
    }
  };

  if (status === 'loading' || loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pending Businesses</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Owner</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <tr key={business._id} className="border-t">
              <td className="p-3">
                <Link href={`/admin/businesses/${business._id}`} className="text-indigo-600 hover:underline">
                  {business.name}
                </Link>
              </td>
              <td className="p-3">{business.category?.name || 'N/A'}</td>
              <td className="p-3">{business.owner?.name || 'N/A'}</td>
              <td className="p-3">{business.address}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleVerify(business._id, 'approved')}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleVerify(business._id, 'rejected')}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}