import React from 'react';
import { HelpCircle, DollarSign } from 'lucide-react';

// Component cho thẻ thống kê
const StatCard = ({ title, value, footerText, isCurrency, infoIcon }) => (
  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
    <div className="text-sm font-medium text-gray-500 flex justify-between items-start mb-1">
      {title}
      {infoIcon && <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />}
    </div>
    <div className="text-xl font-bold text-gray-800 mb-1">
      {isCurrency ? (
        <span className="flex items-center">
          {value}
          <DollarSign className="w-4 h-4 ml-1 text-blue-600" />
        </span>
      ) : (
        value
      )}
    </div>
    {footerText && (
      <p className="text-xs text-gray-500">{footerText}</p>
    )}
  </div>
);

export default StatCard;