import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, HelpCircle, Search, ChevronDown, 
} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

// Component Header
const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      // Logic đóng search/profile khi nhấn ESC
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
      }
      // Logic đóng search/profile khi click ra ngoài
      if (event.type === 'mousedown') {
        if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
        if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const SearchOverlay = () => (
    <div className="absolute top-full left-0 right-0 z-50 flex justify-start pt-2">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] border-2 border-gray-300 ml-6 -mt-1">

        <div className="flex px-4 pt-1 border-b-2 border-gray-200">
          {['Tất cả', 'Sản phẩm', 'Đơn hàng', 'Khách hàng'].map((tab) => {
            const tabKey = tab === 'Tất cả' ? 'all' : tab.toLowerCase().replace(' ', '');
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`py-2 px-4 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'all' && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Tất cả kết quả tìm kiếm</p>
            </div>
          )}
          {activeTab === 'sanpham' && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Kết quả tìm kiếm sản phẩm</p>
            </div>
          )}
          {activeTab === 'donhang' && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Kết quả tìm kiếm đơn hàng</p>
            </div>
          )}
          {activeTab === 'khachhang' && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Kết quả tìm kiếm khách hàng</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <header className="relative flex items-center justify-between h-16 bg-white border-b px-6 shadow-sm z-10 admin-header">
      <div className="flex-1 max-w-lg relative" ref={searchRef}>
        <div
          className={`relative flex items-center rounded-full p-2 border cursor-pointer transition-all duration-200 ${
             isSearchOpen ? 'bg-white border-blue-500 shadow-md' : 'bg-gray-100 border-gray-200 hover:bg-white'
          }`}
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="w-5 h-5 text-gray-500 ml-2" />
          <span className="ml-2 text-sm text-gray-500">Tìm kiếm (Ctrl + K)</span>
        </div>
        {isSearchOpen && <SearchOverlay />}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-0" style={{ backgroundColor: 'transparent', border: 'none' }}><Bell className="w-5 h-5" /></button>
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-0" style={{ backgroundColor: 'transparent', border: 'none' }}><HelpCircle className="w-5 h-5" /></button>

        <div className="relative" ref={profileRef}>
            <div
                className="flex items-center space-x-3 cursor-pointer p-1 rounded-full hover:text-gray-700 transition-colors focus:outline-none focus:ring-0"
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => setIsProfileOpen(prev => !prev)}
            >
                <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold text-sm">NH</div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">tung nhien</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
            {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;