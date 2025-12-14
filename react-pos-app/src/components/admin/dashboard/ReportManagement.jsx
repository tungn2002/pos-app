import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ReportManagement = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showCustomDate, setShowCustomDate] = useState(false);
  
  // Sample data
  const [reportData, setReportData] = useState({
    revenue: 0,
    orders: 0,
    revenueData: [],
    topProducts: []
  });

  // Calculate date ranges based on selected timeframe
  useEffect(() => {
    let start, end;

    switch (selectedTimeframe) {
      case 'today':
        start = new Date();
        end = new Date();
        break;
      case 'yesterday':
        start = new Date();
        start.setDate(start.getDate() - 1);
        end = new Date();
        end.setDate(end.getDate() - 1);
        break;
      case 'week':
        start = new Date();
        start.setDate(start.getDate() - 7);
        end = new Date();
        break;
      case 'month':
        start = new Date();
        start.setMonth(start.getMonth() - 1);
        end = new Date();
        break;
      case 'year':
        start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        end = new Date();
        break;
      case 'custom':
        if (startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
        } else {
          start = new Date();
          end = new Date();
        }
        break;
      default:
        start = new Date();
        end = new Date();
    }

    // Generate sample data based on date range
    const revenue = Math.floor(Math.random() * 50000000) + 10000000; // Random revenue between 10M and 60M
    const orders = Math.floor(Math.random() * 100) + 20; // Random orders between 20 and 120
    
    // Generate revenue data for chart
    const revenueData = [];
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      revenueData.push({
        name: date.toLocaleDateString('vi-VN'),
        revenue: Math.floor(Math.random() * 5000000) + 1000000 // Random daily revenue between 1M and 6M
      });
    }

    // Generate top products data
    const topProducts = [
      { name: 'iPhone 15 Pro Max', quantity: 45, revenue: 126000000 },
      { name: 'MacBook Air M2', quantity: 32, revenue: 80000000 },
      { name: 'AirPods Pro', quantity: 58, revenue: 26100000 },
      { name: 'Samsung Galaxy S24', quantity: 25, revenue: 50000000 },
      { name: 'iPad Pro', quantity: 18, revenue: 32400000 },
    ];

    setReportData({
      revenue,
      orders,
      revenueData,
      topProducts
    });
  }, [selectedTimeframe, startDate, endDate]);

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    if (timeframe !== 'custom') {
      setShowCustomDate(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getDisplayDate = () => {
    if (selectedTimeframe === 'custom' && startDate && endDate) {
      return `Từ ${formatDate(startDate)} đến ${formatDate(endDate)}`;
    }

    switch (selectedTimeframe) {
      case 'today':
        return 'Hôm nay';
      case 'yesterday':
        return 'Hôm qua';
      case 'week':
        return '7 ngày qua';
      case 'month':
        return '30 ngày qua';
      case 'year':
        return '1 năm qua';
      default:
        return 'Tùy chọn';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Báo cáo</h2>
      </div>

      {/* Date Range Selector */}
      <div className="mb-8 p-4 bg-white rounded-xl shadow border border-gray-300">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-medium text-gray-700">Thời gian:</span>
          
          {/* Preset Timeframe Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'today', label: 'Hôm nay' },
              { key: 'yesterday', label: 'Hôm qua' },
              { key: 'week', label: '1 tuần' },
              { key: 'month', label: '1 tháng' },
              { key: 'year', label: '1 năm' }
            ].map((option) => (
              <button
                key={option.key}
                className={`px-4 py-2 rounded-lg border font-medium ${
                  selectedTimeframe === option.key
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleTimeframeChange(option.key)}
              >
                {option.label}
              </button>
            ))}
            
            <button
              className={`px-4 py-2 rounded-lg border font-medium ${
                selectedTimeframe === 'custom'
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => {
                handleTimeframeChange('custom');
                setShowCustomDate(true);
              }}
            >
              Tùy chọn
            </button>
          </div>

          {/* Custom Date Range */}
          {showCustomDate && (
            <div className="flex items-center gap-2 ml-4">
              <input
                type="date"
                className="p-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-gray-500">đến</span>
              <input
                type="date"
                className="p-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}

          {/* Display Current Selection */}
          <div className="ml-auto text-sm font-medium text-blue-600">
            {getDisplayDate()}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Doanh thu</p>
              <p className="text-2xl font-bold">{reportData.revenue.toLocaleString()}đ</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Đơn hàng</p>
              <p className="text-2xl font-bold">{reportData.orders}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300 mb-8">
        <div className="p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800">Biểu đồ doanh thu theo thời gian</h3>
        </div>
        <div className="p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={reportData.revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value/1000000}M`} />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()}đ`, 'Doanh thu']}
                labelFormatter={(label) => `Ngày: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
                name="Doanh thu" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800">Sản phẩm bán chạy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng bán
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {reportData.topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-300 last:border-b-0">
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <div className="text-sm text-gray-900">{product.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.revenue.toLocaleString()}đ</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;