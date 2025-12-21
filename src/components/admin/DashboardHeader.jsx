// src/components/admin/DashboardHeader.jsx
'use client';

import { useState } from 'react';

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Prodex</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search anything"
                className="bg-gray-100 border-0 rounded ml-2 text-sm focus:outline-none focus:ring-0"
              />
            </div>

            {/* Keyboard shortcut hint */}
            <div className="hidden lg:flex items-center text-xs text-gray-500 gap-2">
              <span className="border border-gray-300 rounded px-2 py-1">⌘</span>
              <span className="border border-gray-300 rounded px-2 py-1">K</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-md transition-shadow"
              >
                S
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
