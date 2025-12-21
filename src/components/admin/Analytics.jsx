// src/components/admin/Analytics.jsx
'use client';

const Analytics = () => {
  // Mock data for analytics
  const serviceDemandData = [
    { service: 'Plumbing', searches: 1240, noResults: 320, percentage: 25.8 },
    { service: 'Electrical', searches: 980, noResults: 210, percentage: 21.4 },
    { service: 'Cleaning', searches: 850, noResults: 95, percentage: 11.2 },
    { service: 'Carpentry', searches: 620, noResults: 180, percentage: 29.0 },
    { service: 'Painting', searches: 540, noResults: 65, percentage: 12.0 },
  ];

  const locationData = [
    { location: 'Downtown', unmetDemand: 42 },
    { location: 'East Side', unmetDemand: 38 },
    { location: 'West End', unmetDemand: 29 },
    { location: 'North Hills', unmetDemand: 24 },
    { location: 'South Park', unmetDemand: 18 },
  ];

  const trendingServices = [
    { service: 'Smart Home Installation', growth: '+45%' },
    { service: 'EV Charger Installation', growth: '+38%' },
    { service: 'Eco-Friendly Cleaning', growth: '+32%' },
    { service: 'Bathroom Renovation', growth: '+28%' },
    { service: 'Solar Panel Installation', growth: '+25%' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Unmet Service Demand</h3>
          <div className="space-y-4">
            {serviceDemandData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.service}</span>
                  <span className="text-sm font-medium text-gray-700">{item.noResults} unmet requests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{item.searches} total searches</span>
                  <span className="text-xs text-gray-500">{item.percentage}% unmet</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Areas with Highest Unmet Demand</h3>
          <div className="space-y-4">
            {locationData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm font-medium text-gray-900">{item.location}</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600" 
                    style={{ width: `${(item.unmetDemand / 50) * 100}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm font-medium text-gray-900">{item.unmetDemand}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trending Services</h3>
          <div className="space-y-3">
            {trendingServices.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{item.service}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {item.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Acquisition Opportunities</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Plumbing Services in Downtown</h4>
              <p className="text-sm text-blue-600 mt-1">320 unmet requests in the past month</p>
              <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                View Potential Providers
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Electricians in East Side</h4>
              <p className="text-sm text-green-600 mt-1">210 unmet requests in the past month</p>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                View Potential Providers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;