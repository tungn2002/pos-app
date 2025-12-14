import React from 'react';
import StatCard from './StatCard';

// Dữ liệu mô phỏng (Mock Data)
const initialDashboardData = {
  doanhThuThuan: '0₫',
  tongDon: 0,
  chuaThanhToan: 0,
  dangGiao: 0,
  huy: 0,
  giaTriTrungBinh: '0₫',
  slThucBan: 0,
};

// Component Hiển thị Thống kê
const StatsSection = ({ data = initialDashboardData }) => {
  const statsTopRow = [
    { title: 'Doanh thu thuần', value: data.doanhThuThuan, isCurrency: true },
    { title: 'Tổng đơn', value: data.tongDon },
    { title: 'Chưa thanh toán', value: data.chuaThanhToan },
  ];

  const statsBottomRow = [
    { title: 'Hủy', value: data.huy },
    { title: 'Giá trị trung bình đơn', value: data.giaTriTrungBinh, isCurrency: true },
    { title: 'SL thực bán', value: data.slThucBan },
  ];

  return (
    <div className="border-2 border-gray-300 rounded-xl p-3 mb-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Kết quả kinh doanh</h2>
      <div className="mb-3">
        <div className="grid grid-cols-3 gap-2">
          {statsTopRow.map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-2">
          {statsBottomRow.map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;