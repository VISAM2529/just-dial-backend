// src/app/admin/customers/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import CustomersList from '@/components/admin/CustomersList';

export default function CustomersPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab="customers" setActiveTab={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-2">Manage all customers on the platform</p>
            </div>

            {/* Content */}
            <CustomersList />
          </div>
        </main>
      </div>
    </div>
  );
}
