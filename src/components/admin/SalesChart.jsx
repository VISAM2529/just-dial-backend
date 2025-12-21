// src/components/admin/SalesChart.jsx
'use client';

import { useState } from 'react';

const SalesChart = () => {
  const [period, setPeriod] = useState('Monthly');

  const chartData = [
    { month: 'Jan', oneTime: 100, recurring: 80 },
    { month: 'Feb', oneTime: 80, recurring: 95 },
    { month: 'Mar', oneTime: 120, recurring: 85 },
    { month: 'Apr', oneTime: 95, recurring: 110 },
    { month: 'May', oneTime: 140, recurring: 130 },
    { month: 'Jun', oneTime: 110, recurring: 140 },
    { month: 'Jul', oneTime: 130, recurring: 120 },
    { month: 'Aug', oneTime: 100, recurring: 115 },
  ];

  const maxValue = 150;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="text-2xl mr-2">📊</span> Sales Revenue
        </h3>
        <div className="flex gap-2">
          {['Monthly', 'Quarterly', 'Yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <span className="text-sm text-gray-600">One-Time Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-300 rounded-full"></div>
          <span className="text-sm text-gray-600">Recurring Revenue</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-flex-end gap-3 h-64">
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end gap-1 h-48">
              {/* One-Time Revenue Bar */}
              <div
                className="w-5 bg-indigo-500 rounded-t transition-all hover:bg-indigo-600"
                style={{ height: `${(data.oneTime / maxValue) * 100}%` }}
                title={`${data.month} One-Time: $${data.oneTime}k`}
              ></div>
              {/* Recurring Revenue Bar */}
              <div
                className="w-5 bg-indigo-300 rounded-t transition-all hover:bg-indigo-400"
                style={{ height: `${(data.recurring / maxValue) * 100}%` }}
                title={`${data.month} Recurring: $${data.recurring}k`}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-2 font-medium">{data.month}</span>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-4 pl-4">
        <span>0</span>
        <span>50K</span>
        <span>100K</span>
        <span>150K</span>
      </div>
    </div>
  );
};

export default SalesChart;
