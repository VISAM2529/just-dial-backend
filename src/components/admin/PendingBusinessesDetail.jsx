'use client';

import { useState } from 'react';

const PendingBusinessesDetail = ({ business, onBack, onRefresh }) => {
  const [verifying, setVerifying] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleVerify = async () => {
    if (!window.confirm('Are you sure you want to verify this business?')) return;

    setVerifying(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/businesses/${business._id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'approved',
        }),
      });

      if (response.ok) {
        alert('Business verified successfully!');
        onRefresh();
        onBack();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Error verifying business:', error);
      alert('Error verifying business');
    } finally {
      setVerifying(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    if (!window.confirm('Are you sure you want to reject this business?')) return;

    setRejecting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/businesses/${business._id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'rejected',
          reason: rejectReason,
        }),
      });

      if (response.ok) {
        alert('Business rejected successfully!');
        onRefresh();
        onBack();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Error rejecting business:', error);
      alert('Error rejecting business');
    } finally {
      setRejecting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-2 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{business.name}</h2>
          <p className="text-gray-600 mt-1">Pending Verification</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Owner Name</label>
            <p className="text-gray-700 bg-gray-50 rounded px-3 py-2">{business.owner?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Owner Email</label>
            <p className="text-gray-700 bg-gray-50 rounded px-3 py-2">{business.owner?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
            <p className="text-gray-700 bg-gray-50 rounded px-3 py-2">{business.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
            <p className="text-gray-700 bg-gray-50 rounded px-3 py-2">{business.category?.name || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
            <p className="text-gray-700 bg-gray-50 rounded px-3 py-2">{business.address || 'N/A'}</p>
          </div>
        </div>

        {/* Aadhar Documents */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aadhar Verification Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aadhar Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Aadhar Number</label>
              <p className="text-gray-700 bg-gray-50 rounded px-3 py-2 font-mono">
                {business.aadharNumber ? `**** **** ${business.aadharNumber.slice(-4)}` : 'N/A'}
              </p>
            </div>

            {/* Aadhar Front Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Aadhar Front Image</label>
              {business.aadharFrontImage ? (
                <a
                  href={business.aadharFrontImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  View Image
                </a>
              ) : (
                <p className="text-gray-500">No image provided</p>
              )}
            </div>

            {/* Aadhar Back Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Aadhar Back Image</label>
              {business.aadharBackImage ? (
                <a
                  href={business.aadharBackImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  View Image
                </a>
              ) : (
                <p className="text-gray-500">No image provided</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t pt-6 flex gap-3">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {verifying ? 'Verifying...' : '✓ Approve Business'}
          </button>

          <button
            onClick={() => setShowRejectForm(!showRejectForm)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            ✗ Reject Business
          </button>
        </div>

        {/* Reject Form */}
        {showRejectForm && (
          <div className="border-t pt-6 space-y-4 bg-red-50 rounded-lg p-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Reason for Rejection</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter the reason why this business is being rejected..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="4"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                disabled={rejecting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {rejecting ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
              <button
                onClick={() => setShowRejectForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingBusinessesDetail;
