// src/app/admin/businesses/rejected/page.jsx
'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import RejectedBusinesses from '@/components/admin/RejectedBusinesses';

export default function RejectedBusinessesPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab="rejected-businesses" setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Rejected Businesses</h1>
              <p className="text-gray-600 mt-2">View rejected business registrations</p>
            </div>

            {/* Content */}
            <RejectedBusinesses />
          </div>
        </main>
      </div>
    </div>
  );
}
