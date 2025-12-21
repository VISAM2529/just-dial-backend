// src/components/admin/AdminSidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    pendingVerification: 0,
    verifiedBusinesses: 0,
    rejectedBusinesses: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin', submenu: null },
    {
      id: 'customers',
      label: 'Customers',
      icon: '👥',
      path: '/admin/customers',
      submenu: null,
    },
    {
      id: 'businesses',
      label: 'Businesses',
      icon: '🏢',
      path: '/admin/businesses',
      submenu: [
        { id: 'all-businesses', label: 'All Businesses', path: '/admin/businesses' },
        { id: 'pending-verification', label: 'Pending Verification', path: '/admin/businesses/pending' },
        { id: 'verified-businesses', label: 'Verified Businesses', path: '/admin/businesses/verified' },
        { id: 'rejected-businesses', label: 'Rejected Businesses', path: '/admin/businesses/rejected' },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      {/* Logo Section */}
      <div className="h-24 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Abhinnati</h1>
          <p className="text-xs text-blue-100 font-medium">Admin Portal</p>
        </div>
      </div>

      {/* Stats Summary Section */}
   

      {/* Main Menu */}
      <nav className="px-4 py-6 flex-1">
        <div className="mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-4">Navigation</p>
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.path) {
                    handleNavigation(item.path);
                  }
                  if (item.submenu) {
                    setExpandedMenu(expandedMenu === item.id ? null : item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.submenu && (
                  <span className={`transform transition-transform duration-200 text-xs ${expandedMenu === item.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedMenu === item.id && (
                <div className="mt-1 ml-6 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={() => {
                        // Don't change activeTab for submenu items to keep menu open
                        if (subitem.path) {
                          handleNavigation(subitem.path);
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                        activeTab === subitem.id
                          ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <span>{subitem.label}</span>
                      {subitem.id === 'pending-verification' && stats.pendingVerification > 0 && (
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {stats.pendingVerification}
                        </span>
                      )}
                      {subitem.id === 'verified-businesses' && stats.verifiedBusinesses > 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {stats.verifiedBusinesses}
                        </span>
                      )}
                      {subitem.id === 'rejected-businesses' && stats.rejectedBusinesses > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {stats.rejectedBusinesses}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Settings Section */}
      <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">Settings</p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;