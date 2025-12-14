import React, { useState } from 'react';
import {
  LayoutDashboard, ShoppingCart, Archive, Package, Warehouse, Users, Tag, CreditCard,
  BarChart3, MessageSquare, Briefcase, ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

// Sidebar (Menu trái)
const Sidebar = ({ selectedMenu, setSelectedMenu, isCollapsed, toggleCollapse, storeName }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const menuConfig = [
    { name: 'Bán hàng', isHeader: true },
    { name: 'Tổng quan', icon: LayoutDashboard, path: 'tongquan' },
    { name: 'Đơn hàng', icon: ShoppingCart, path: 'donhang' },
    { name: 'Nhân viên', icon: Users, path: 'nhanvien' },
    {
      name: 'Sản phẩm',
      icon: Archive,
      path: 'sanpham',
      hasSubMenu: true,
      subItems: [
        { name: 'Danh sách sản phẩm', path: 'danhsachsanpham' },
        { name: 'Danh mục sản phẩm', path: 'danhmucsanpham' }
      ]
    },
    { name: 'Quản lý kho', icon: Warehouse, path: 'quanlykho' },
    { name: 'Sổ quỹ', icon: CreditCard, path: 'soquy' },
    { name: 'Báo cáo', icon: BarChart3, path: 'baocao' },

    { name: 'KÊNH BÁN HÀNG', isHeader: true },
    { name: 'POS', icon: Briefcase, path: 'pos' },

    { name: 'ỨNG DỤNG', isHeader: true },
    { name: 'Cấu hình', icon: Tag, path: 'cauhinh' },
  ];

  const handleProductClick = (item) => {
    if (item.hasSubMenu) {
      setOpenDropdown(openDropdown === item.path ? null : item.path);
    } else {
      if (item.path === 'pos') {
        // Navigate to the POS page
        navigate('/pos');
      } else {
        setSelectedMenu(item.path);
      }
      setOpenDropdown(null);
    }
  };

  return (
    <div className={`
      ${isCollapsed ? 'w-20' : 'w-64'}
      bg-gray-900 min-h-screen p-4 flex flex-col shadow-xl transition-all duration-300 flex-shrink-0 admin-sidebar
    `}>
      {/* Logo và Nút Thu Gọn */}
      <div className="flex items-center p-2 pb-4 mb-4 relative border-b border-gray-700">
        <div className="flex items-center flex-1">
          <h1 className={`text-3xl font-extrabold text-blue-400 tracking-wider ${isCollapsed ? 'opacity-0' : 'truncate'}`}>
            {storeName || 'Sapo'}
          </h1>
        </div>

        <button
          onClick={toggleCollapse}
          className={`p-1 rounded-full text-gray-400 hover:text-white transition-colors ${isCollapsed ? 'absolute top-0 right-0' : ''}`}
          style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', boxShadow: 'none' }}
          title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className="overflow-y-auto flex-grow pr-2">
        {menuConfig.map((item, index) => {
          if (item.isHeader) {
            // Check if this is the "KÊNH BÁN HÀNG" header (specifically this one)
            if (item.name === 'KÊNH BÁN HÀNG') {
              if (isCollapsed) {
                // For "KÊNH BÁN HÀNG", always show the separator line
                return <div key={index} className="border-t border-gray-700 my-2"></div>;
              } else {
                // When expanded, show the header text with border
                return (
                  <p key={index} className="text-xs font-semibold uppercase text-gray-400 mt-6 mb-2 pt-2 border-t border-gray-700 first:mt-0 first:border-t-0">
                    {item.name}
                  </p>
                );
              }
            } else if (item.name === 'ỨNG DỤNG') {
              if (isCollapsed) {
                // For "ỨNG DỤNG", always show the separator line
                return <div key={index} className="border-t border-gray-700 my-2"></div>;
              } else {
                // When expanded, show the header text with border
                return (
                  <p key={index} className="text-xs font-semibold uppercase text-gray-400 mt-6 mb-2 pt-2 border-t border-gray-700 first:mt-0 first:border-t-0">
                    {item.name}
                  </p>
                );
              }
            } else {
              // For other headers, hide completely when collapsed
              return !isCollapsed && (
                <p key={index} className="text-xs font-semibold uppercase text-gray-400 mt-6 mb-2 pt-2 border-t border-gray-700 first:mt-0 first:border-t-0">
                  {item.name}
                </p>
              );
            }
          }

          // For items with sub-menu
          if (item.hasSubMenu) {
            return (
              <div key={item.path} className="mb-1">
                <div
                  className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-0 cursor-pointer ${
                    openDropdown === item.path
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-white hover:bg-gray-800'
                  }`}
                  onClick={() => !isCollapsed && handleProductClick(item)}
                >
                  <item.icon className={`w-5 h-5 ${!isCollapsed ? 'mr-3' : ''} ${openDropdown === item.path ? 'text-white' : 'text-gray-300'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 flex justify-between items-center">
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openDropdown === item.path ? 'rotate-180' : ''}`}
                      />
                    </div>
                  )}
                </div>

                {/* Submenu - only visible when expanded and dropdown is open */}
                {!isCollapsed && openDropdown === item.path && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.path}
                        className={`p-2 pl-4 rounded text-sm transition-colors duration-150 cursor-pointer ${
                          selectedMenu === subItem.path
                            ? 'bg-blue-700 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                        onClick={() => {
                          setSelectedMenu(subItem.path);
                          setOpenDropdown(null);
                        }}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // For regular items without submenu
          return (
            <NavItem
              key={item.path}
              name={item.name}
              Icon={item.icon}
              isSelected={selectedMenu === item.path}
              onClick={() => {
                if (item.path === 'pos') {
                  // Navigate to the POS page
                  navigate('/pos');
                } else {
                  setSelectedMenu(item.path);
                }
              }}
              hasSubMenu={item.name === 'Bán hàng'}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </div>

    </div>
  );
};

export default Sidebar;