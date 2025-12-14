import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dữ liệu doanh thu, sử dụng cột "DoanhThu"
const revenueData = [
  { time: '00:00', DoanhThu: 0 }, { time: '02:00', DoanhThu: 50 }, { time: '04:00', DoanhThu: 100 },
  { time: '06:00', DoanhThu: 50 }, { time: '08:00', DoanhThu: 150 }, { time: '10:00', DoanhThu: 200 },
  { time: '12:00', DoanhThu: 180 }, { time: '14:00', DoanhThu: 250 }, { time: '16:00', DoanhThu: 220 },
  { time: '18:00', DoanhThu: 300 }, { time: '20:00', DoanhThu: 250 }, { time: '22:00', DoanhThu: 350 },
];

// Component Biểu đồ Doanh thu
const RevenueChart = ({ data = revenueData }) => (
  <div className="border-2 border-gray-300 rounded-xl p-4 max-w-3xl ml-0 mr-auto">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Biểu đồ doanh thu</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} style={{ fontSize: '10px', fill: '#6b7280' }} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}₫`} style={{ fontSize: '10px', fill: '#6b7280' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Bar dataKey="DoanhThu" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;