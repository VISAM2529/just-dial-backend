// src/components/admin/DashboardStats.jsx
const DashboardStats = () => {
  const stats = [
    { name: 'Total Users', value: '12,402', change: '+12%', changeType: 'positive', icon: '👥' },
    { name: 'Total Businesses', value: '3,521', change: '+5%', changeType: 'positive', icon: '🏢' },
    { name: 'Pending Verifications', value: '42', change: '+3', changeType: 'negative', icon: '⏳' },
    { name: 'Monthly Bookings', value: '8,249', change: '+18%', changeType: 'positive', icon: '📅' },
  ];

  const activities = [
    { action: 'New business registration', business: 'Plumbing Pros', time: '2 hours ago', icon: '🏢' },
    { action: 'Business verified', business: 'Electric Solutions', time: '5 hours ago', icon: '✅' },
    { action: 'Category added', business: 'Home Cleaning', time: '1 day ago', icon: '📋' },
    { action: 'User signed up', business: 'John Doe', time: '1 day ago', icon: '👤' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow rounded-xl border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                    <div className={`mt-1 text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span> Recent Activities
          </h3>
          <ul className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <li key={index} className="py-3">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 text-lg">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-sm text-gray-500 truncate">{activity.business}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors">
              <span className="mr-2">✅</span> Verify Businesses
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors">
              <span className="mr-2">📋</span> Add Category
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors">
              <span className="mr-2">📊</span> View Analytics
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors">
              <span className="mr-2">📄</span> Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;