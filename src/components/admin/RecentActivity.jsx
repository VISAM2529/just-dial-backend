// src/components/admin/RecentActivity.jsx
'use client';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Order #2048',
      description: 'John Doe',
      time: '12 Jan 25',
      label: 'New Order',
      labelColor: 'blue',
    },
    {
      id: 2,
      type: 'stock',
      title: 'Low Stock Alert',
      description: 'MacBook Air M2',
      time: '10 Jan 25',
      label: 'Low Stock',
      labelColor: 'red',
    },
    {
      id: 3,
      type: 'promo',
      title: 'Promo code "SUMMER20"',
      description: 'Applied 52 times',
      time: '8 Jan 25',
      label: 'Campaign',
      labelColor: 'purple',
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      description: 'Version 1.2.1',
      time: '2 Jan 25',
      label: 'System',
      labelColor: 'gray',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'stock':
        return '⚠️';
      case 'promo':
        return '🎁';
      case 'system':
        return '⚙️';
      default:
        return '📌';
    }
  };

  const getLabelColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      red: 'bg-red-100 text-red-700',
      purple: 'bg-purple-100 text-purple-700',
      gray: 'bg-gray-100 text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          See All
        </a>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="text-2xl flex-shrink-0">{getIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLabelColor(activity.labelColor)}`}>
                  {activity.label}
                </span>
              </div>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
