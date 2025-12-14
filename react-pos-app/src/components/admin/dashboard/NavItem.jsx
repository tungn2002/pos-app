import React from 'react';
import { ChevronDown } from 'lucide-react';

// Component cho mục điều hướng
const NavItem = ({ name, Icon, isSelected, hasSubMenu, onClick, isCollapsed }) => (
  <div className={`group nav-item ${isSelected ? 'selected' : ''}`}>
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-0
        ${isSelected
          ? 'bg-blue-600 text-white font-semibold shadow-md'
          : 'text-white'
        }
        ${isCollapsed ? 'justify-center' : 'justify-between'}
      `}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
        <Icon className={`w-5 h-5 ${!isCollapsed ? 'mr-3' : ''} ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-blue-400'}`} />
        {!isCollapsed && name}
      </div>
      
      {!isCollapsed && hasSubMenu && <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-180' : ''}`} />}
    </button>
  </div>
);

export default NavItem;