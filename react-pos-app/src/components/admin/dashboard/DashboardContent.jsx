import React from 'react';
import TimeRangeFilter from './TimeRangeFilter';
import StatsSection from './StatsSection';
import RevenueChart from './RevenueChart';

// Nội dung Dashboard chính
const DashboardContent = () => (
  <div className="p-4">
    <TimeRangeFilter />
    <div className="flex gap-6">
      <div className="flex-1">
        <StatsSection />
      </div>
      <div className="w-80 flex-shrink-0">
        <div className="border-2 border-gray-300 rounded-xl p-4 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nhật ký hoạt động</h3>
          <div className="relative">
            <div className="space-y-4 pl-6"> {/* Add left padding to account for timeline */}
              <div className="flex items-start space-x-3 py-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-500 flex-shrink-0 -ml-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-bold">Sapo</span> Đơn hàng được lưu trữ <a href="#" className="text-blue-600 hover:underline">#1001</a>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">06/12/2025 19:18:33</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 py-3">
                <div className="p-2 rounded-full bg-green-100 text-green-500 flex-shrink-0 -ml-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-bold">Sapo</span> Đã xác nhận đơn hàng <a href="#" className="text-blue-600 hover:underline">#1001</a>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">06/12/2025 19:18:33</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 py-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-500 flex-shrink-0 -ml-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-bold">Sapo</span> Khách hàng đặt đơn hàng trên POS <a href="#" className="text-blue-600 hover:underline">#1001</a>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">06/12/2025 19:18:33</p>
                </div>
              </div>
            </div>
            {/* Đường kẻ dọc mô phỏng timeline */}
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="-mt-6">  {/* Reduce the top margin even more */}
            <RevenueChart />
          </div>
          <div className="border-2 border-gray-300 rounded-xl p-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sản phẩm bán chạy</h2>
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="w-80 flex-shrink-0 invisible">
          {/* Empty space to match the activity log width from above */}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardContent;