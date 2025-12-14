import React from 'react';
import { Package2, CheckCircle, Users } from 'lucide-react';
import ActivityItem from './ActivityItem';

// Dữ liệu mô phỏng cho nhật ký hoạt động
const activityLog = [
  { id: 1, type: 'Đơn hàng', title: 'Đơn hàng được lưu trữ', number: '#1001', time: '06/12/2025 19:18:33', icon: Package2, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: 2, type: 'Xác nhận', title: 'Đã xác nhận đơn hàng', number: '#1001', time: '06/12/2025 19:18:33', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
  { id: 3, type: 'Khách hàng', title: 'Khách hàng đặt đơn hàng trên POS', number: '#1001', time: '06/12/2025 19:18:33', icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-100' },
];

// Sidebar Phải (Nhật ký hoạt động)
const SidebarRight = ({ activityLog: providedActivityLog = activityLog }) => (
  <div className="border-2 border-gray-300 rounded-xl p-4 w-80">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Nhật ký hoạt động</h3>
    <div className="space-y-4">
      <div className="relative">
        {providedActivityLog.map(item => <ActivityItem key={item.id} {...item} />)}
        {/* Đường kẻ dọc mô phỏng timeline */}
        <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-300"></div>
      </div>
    </div>
  </div>
);

export default SidebarRight;