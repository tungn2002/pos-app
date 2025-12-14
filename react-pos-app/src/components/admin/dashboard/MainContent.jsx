import React, { useState, useEffect } from 'react';
import Header from './Header';
import DashboardContent from './DashboardContent';
import SidebarRight from './SidebarRight';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import InventoryManagement from './InventoryManagement';
import EmployeeManagement from './EmployeeManagement';
import FundManagement from './FundManagement';
import ReportManagement from './ReportManagement';
import OrderManagement from '../order/OrderManagement';

// Nội dung Chính (Bao gồm Header và Body)
const MainContent = ({ selectedMenu }) => {
  const [selectedConfigItem, setSelectedConfigItem] = useState('cauhinhchung');

  // Initialize store configuration from localStorage or defaults
  const [storeName, setStoreName] = useState(() => {
    const savedName = localStorage.getItem('storeName');
    return savedName || 'Cửa hàng ABC';
  });

  const [storeAddress, setStoreAddress] = useState(() => {
    const savedAddress = localStorage.getItem('storeAddress');
    return savedAddress || '123 Đường ABC, Quận XYZ, TP. HCM';
  });

  // Load saved configuration when component mounts
  useEffect(() => {
    const savedName = localStorage.getItem('storeName');
    const savedAddress = localStorage.getItem('storeAddress');

    if (savedName) setStoreName(savedName);
    if (savedAddress) setStoreAddress(savedAddress);
  }, []);

  return (
    <main className="flex-grow overflow-auto bg-gray-50">
      <Header />

      {selectedMenu === 'tongquan' ? (
        <div>
          <DashboardContent />
        </div>
      ) : selectedMenu === 'danhsachsanpham' ? (
        <ProductList />
      ) : selectedMenu === 'danhmucsanpham' ? (
        <CategoryList />
      ) : selectedMenu === 'quanlykho' ? (
        <InventoryManagement />
      ) : selectedMenu === 'nhanvien' ? (
        <EmployeeManagement />
      ) : selectedMenu === 'soquy' ? (
        <FundManagement />
      ) : selectedMenu === 'baocao' ? (
        <ReportManagement />
      ) : selectedMenu === 'donhang' ? (
        <OrderManagement />
      ) : (
        selectedMenu === 'taikhoan' ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h2>

            {/* Card 1: Basic Information */}
            <div className="border-2 border-gray-300 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                  <p className="p-2 border border-gray-300 rounded">Nguyễn Văn A</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <p className="p-2 border border-gray-300 rounded">0123456789</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="p-2 border border-gray-300 rounded">nguyenvana@example.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <p className="p-2 border border-gray-300 rounded">01/01/1990</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                  <p className="p-2 border border-gray-300 rounded">Nam</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <p className="p-2 border border-gray-300 rounded">123 Đường ABC, Quận XYZ, TP. HCM</p>
                </div>
              </div>
            </div>

            {/* Card 2: Account Linking */}
            <div className="border-2 border-gray-300 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Liên kết tài khoản</h3>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.4-3.305-7.4-7.4s3.305-7.4 7.4-7.4c2.099 0 3.781.959 4.994 2.48l3.52-3.194C17.58 2.960 15.041 2 12.24 2z"/>
                </svg>
                <div className="flex-1">
                  <p className="font-medium">Tài khoản của bạn chưa liên kết với Google</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Liên kết tài khoản
                </button>
              </div>
            </div>
          </div>
        ) : selectedMenu === 'cauhinh' ? (
          <div className="p-6">
            <div className="flex">
              {/* Left sidebar for configuration menu */}
              <div className="w-64 border-r pr-6">
                <div className="space-y-2">
                  <button
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConfigItem === 'cauhinhchung'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-100 bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedConfigItem('cauhinhchung')}
                  >
                    Cấu hình chung
                  </button>
                  <button
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConfigItem === 'nhatkyhoatdong'
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-100 bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedConfigItem('nhatkyhoatdong')}
                  >
                    Nhật ký hoạt động
                  </button>
                </div>
              </div>

              {/* Right side for configuration details */}
              <div className="flex-1 pl-6">
                {selectedConfigItem === 'cauhinhchung' || !selectedConfigItem ? (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Cấu hình chung</h2>
                    <div className="border-2 border-gray-300 rounded-xl p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên cửa hàng</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            value={storeAddress}
                            onChange={(e) => setStoreAddress(e.target.value)}
                          />
                        </div>
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          onClick={() => {
                            // Save configuration to localStorage
                            localStorage.setItem('storeName', storeName);
                            localStorage.setItem('storeAddress', storeAddress);

                            // Dispatch event to update store name in dashboard
                            const storeUpdateEvent = new CustomEvent('store-name-update', {
                              detail: { storeName: storeName }
                            });
                            window.dispatchEvent(storeUpdateEvent);

                            // Show success message
                            const notificationEvent = new CustomEvent('notification', {
                              detail: { message: 'Cấu hình đã được lưu thành công!', type: 'success' }
                            });
                            window.dispatchEvent(notificationEvent);
                          }}
                        >
                          Lưu cấu hình
                        </button>
                      </div>
                    </div>
                  </div>
                ) : selectedConfigItem === 'nhatkyhoatdong' ? (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Nhật ký hoạt động</h2>
                    <div className="border-2 border-gray-300 rounded-xl p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                          <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800"><span className="font-bold">Sapo</span> Đơn hàng được lưu trữ <a href="#" className="text-blue-600 hover:underline">#1001</a></p>
                            <p className="text-xs text-gray-500">06/12/2025 19:18:33</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                          <div className="p-2 rounded-full bg-green-100 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800"><span className="font-bold">Sapo</span> Đã xác nhận đơn hàng <a href="#" className="text-blue-600 hover:underline">#1001</a></p>
                            <p className="text-xs text-gray-500">06/12/2025 19:18:33</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                          <div className="p-2 rounded-full bg-purple-100 text-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800"><span className="font-bold">Sapo</span> Khách hàng đặt đơn hàng trên POS <a href="#" className="text-blue-600 hover:underline">#1001</a></p>
                            <p className="text-xs text-gray-500">06/12/2025 19:18:33</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10">
            <div className="text-xl font-medium text-gray-500">
              Đây là trang: {selectedMenu.toUpperCase()} (Đang phát triển...)
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default MainContent;