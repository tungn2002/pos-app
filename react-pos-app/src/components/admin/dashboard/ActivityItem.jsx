import React from 'react';

// Component cho 1 mục Hoạt động
const ActivityItem = ({ icon: Icon, title, number, time, color, bgColor }) => (
  <div className="flex items-start space-x-3 py-3 border-l-2 border-gray-200 pl-4">
    <div className={`p-2 rounded-full ${bgColor} ${color} flex-shrink-0`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-800">
        <span className="font-bold">Sapo</span> {title} <a href="#" className="text-blue-600 hover:underline">{number}</a>
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{time}</p>
    </div>
  </div>
);

export default ActivityItem;