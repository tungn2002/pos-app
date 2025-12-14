import React, { useState, useMemo } from 'react';
import { Clock } from 'lucide-react';

// Component Lọc thời gian
const TimeRangeFilter = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  
  const dateRanges = useMemo(() => ({
    today: '08/12/2025 - 08/12/2025',
    thisWeek: '02/12/2025 - 08/12/2025',
    thisMonth: '01/12/2025 - 08/12/2025',
    thisYear: '01/01/2025 - 08/12/2025',
  }), []);

  const currentRangeText = dateRanges[selectedPeriod] || dateRanges.thisWeek;

  return (
    <div className="flex space-x-3 items-center text-sm">
      <select 
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="today">Hôm nay</option>
        <option value="yesterday">Hôm qua</option>
        <option value="thisWeek">Tuần này</option>
        <option value="thisMonth">Tháng này</option>
        <option value="thisYear">Năm nay</option>
      </select>
      
      <div className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        <span className="font-medium">{currentRangeText}</span>
      </div>
    </div>
  );
};

export default TimeRangeFilter;