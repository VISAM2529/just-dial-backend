// src/app/admin/businesses/pending/page.jsx
'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import PendingBusinessesTable from '@/components/admin/PendingBusinessesTable';
import PendingBusinessesDetail from '@/components/admin/PendingBusinessesDetail';

export default function PendingBusinessesPage() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleRefresh = () => {
    // Trigger refresh of pending businesses
    window.location.reload();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab="pending-verification" setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Pending Verification</h1>
              <p className="text-gray-600 mt-2">Review and verify pending business registrations</p>
            </div>

            {/* Content */}
            {selectedBusiness ? (
              <PendingBusinessesDetail 
                business={selectedBusiness} 
                onBack={() => setSelectedBusiness(null)} 
                onRefresh={handleRefresh}
              />
            ) : (
              <PendingBusinessesTable onSelectBusiness={setSelectedBusiness} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}