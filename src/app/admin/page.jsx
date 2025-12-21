// src/app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import RecentActivity from '@/components/admin/RecentActivity';
import PendingBusinessesTable from '@/components/admin/PendingBusinessesTable';
import PendingBusinessesDetail from '@/components/admin/PendingBusinessesDetail';
import CustomersList from '@/components/admin/CustomersList';
import VerifiedBusinesses from '@/components/admin/VerifiedBusinesses';
import RejectedBusinesses from '@/components/admin/RejectedBusinesses';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use default stats if API fails
      setStats({
        totalUsers: 0,
        totalBusinesses: 0,
        verifiedBusinesses: 0,
        pendingVerification: 0,
        totalBookings: 0,
        totalReviews: 0,
        averageRating: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Stat cards data - using real data from API
  const statCards = [
    {
      id: 1,
      title: 'Total Users',
      value: stats?.totalUsers || '0',
      icon: '👥',
      trend: '+5%',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-600',
      trendColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Total Businesses',
      value: stats?.totalBusinesses || '0',
      icon: '🏢',
      trend: '+12%',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-600',
      textColor: 'text-green-600',
      trendColor: 'text-green-600',
    },
    {
      id: 3,
      title: 'Verified Businesses',
      value: stats?.verifiedBusinesses || '0',
      icon: '✅',
      trend: '+8%',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-600',
      textColor: 'text-purple-600',
      trendColor: 'text-purple-600',
    },
    {
      id: 4,
      title: 'Pending Verification',
      value: stats?.pendingVerification || '0',
      icon: '⏳',
      trend: stats?.pendingVerification > 0 ? '⚠️ Action Required' : '✓',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-600',
      textColor: 'text-amber-600',
      trendColor: stats?.pendingVerification > 0 ? 'text-amber-600' : 'text-green-600',
    },
    {
      id: 5,
      title: 'Total Bookings',
      value: stats?.totalBookings || '0',
      icon: '📅',
      trend: '+15%',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      iconBg: 'bg-pink-600',
      textColor: 'text-pink-600',
      trendColor: 'text-pink-600',
    },
    {
      id: 6,
      title: 'Total Reviews',
      value: stats?.totalReviews || '0',
      icon: '⭐',
      trend: '+10%',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      trendColor: 'text-indigo-600',
    },
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Welcome back to your admin panel' };
      case 'customers':
        return { title: 'Customers', subtitle: 'Manage all registered customers' };
      case 'pending-verification':
        return { title: 'Pending Verification', subtitle: 'Review and approve business registrations' };
      case 'verified-businesses':
        return { title: 'Verified Businesses', subtitle: 'All approved and active businesses' };
      case 'rejected-businesses':
        return { title: 'Rejected Businesses', subtitle: 'Businesses that were not approved' };
      default:
        return { title: 'Admin Panel', subtitle: 'Manage your platform' };
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat) => (
                <div
                  key={stat.id}
                  className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-6 hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2 font-medium">{stat.title}</p>
                      <p className={`text-3xl font-bold ${stat.textColor}`}>
                        {loading ? '...' : stat.value}
                      </p>
                      <p className={`text-sm mt-2 font-medium ${stat.trendColor}`}>
                        {stat.trend}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pending Businesses */}
            <div>
              <PendingBusinessesTable onSelectBusiness={setSelectedBusiness} />
            </div>
          </div>
        );

      case 'pending-verification':
        return selectedBusiness ? (
          <PendingBusinessesDetail 
            business={selectedBusiness} 
            onBack={() => setSelectedBusiness(null)} 
            onRefresh={fetchDashboardStats} 
          />
        ) : (
          <PendingBusinessesTable onSelectBusiness={setSelectedBusiness} />
        );

      case 'verified-businesses':
        return <VerifiedBusinesses />;

      case 'rejected-businesses':
        return <RejectedBusinesses />;

      case 'customers':
        return <CustomersList />;

      default:
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-gray-600 text-lg font-medium">Page Under Development</p>
            <p className="text-gray-500 text-sm mt-2">This feature will be available soon</p>
          </div>
        );
    }
  };

  const pageTitle = getPageTitle();

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        {/* <DashboardHeader /> */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle.title}</h1>
              <p className="text-gray-600 mt-2">{pageTitle.subtitle}</p>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}