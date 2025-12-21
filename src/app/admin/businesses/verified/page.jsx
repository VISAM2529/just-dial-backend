// src/app/admin/businesses/verified/page.jsx
'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import VerifiedBusinesses from '@/components/admin/VerifiedBusinesses';

export default function VerifiedBusinessesPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab="verified-businesses" setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Verified Businesses</h1>
              <p className="text-gray-600 mt-2">View all verified and approved businesses</p>
            </div>

            {/* Content */}
            <VerifiedBusinesses />
          </div>
        </main>
      </div>
    </div>
  );
}
