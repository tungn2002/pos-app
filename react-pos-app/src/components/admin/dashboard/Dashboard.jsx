import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

// Component Root của ứng dụng
const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('tongquan');
  const [selectedConfigItem, setSelectedConfigItem] = useState('cauhinhchung'); // Default config item
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [storeName, setStoreName] = useState(() => {
    const savedName = localStorage.getItem('storeName');
    return savedName || 'Cửa hàng ABC';
  });

  useEffect(() => {
    const handleMenuChange = (event) => {
      setSelectedMenu(event.detail);
    };

    // Listen for store name changes
    const handleStoreNameUpdate = (event) => {
      setStoreName(event.detail.storeName);
    };

    window.addEventListener('menu-change', handleMenuChange);
    window.addEventListener('store-name-update', handleStoreNameUpdate);

    return () => {
      window.removeEventListener('menu-change', handleMenuChange);
      window.removeEventListener('store-name-update', handleStoreNameUpdate);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full font-sans antialiased">
      <Sidebar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        storeName={storeName}
      />

      <MainContent
        selectedMenu={selectedMenu}
        selectedConfigItem={selectedConfigItem}
        setSelectedConfigItem={setSelectedConfigItem}
      />
    </div>
  );
};

export default Dashboard;