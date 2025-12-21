// src/components/admin/CategoryPieChart.jsx
'use client';

const CategoryPieChart = () => {
  const categories = [
    { name: 'Electronics', value: 85000, percentage: 68, color: '#f59e0b' },
    { name: 'Fashion', value: 25000, percentage: 20, color: '#8b5cf6' },
    { name: 'Health & Wellness', value: 10000, percentage: 8, color: '#10b981' },
    { name: 'Home & Living', value: 5000, percentage: 4, color: '#3b82f6' },
  ];

  const totalSales = categories.reduce((acc, cat) => acc + cat.value, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              {/* This is a simplified pie chart representation */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="30"
                strokeDasharray="107 157"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="30"
                strokeDasharray="31 157"
                strokeDashoffset="-107"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="30"
                strokeDasharray="13 157"
                strokeDashoffset="-138"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="30"
                strokeDasharray="6 157"
                strokeDashoffset="-151"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">
                ${(totalSales / 1000).toFixed(0)}K
              </span>
              <span className="text-xs text-gray-500">Total Sales</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 ml-8">
          {categories.map((category) => (
            <div key={category.name} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">${(category.value / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
