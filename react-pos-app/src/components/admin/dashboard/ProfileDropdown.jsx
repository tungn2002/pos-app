import React from 'react';
import { Settings, LogOut } from 'lucide-react';

// Component Dropdown Profile
const ProfileDropdown = ({ onClose }) => (
    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border-2 border-gray-300 z-50">
        <div className="p-3 border-b-2 border-gray-200">
            <p className="text-sm font-semibold text-gray-800">tung nhien</p>
            <p className="text-xs text-gray-500">Shop ID: 12345</p>
        </div>
        <nav className="p-1">
            <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Find a way to update the selected menu in the parent
                  // Since we can't directly access the parent state, we'll use a workaround
                  window.dispatchEvent(new CustomEvent('menu-change', { detail: 'taikhoan' }));
                  onClose();
                }}
                className="flex items-center p-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
                <Settings className="w-4 h-4 mr-2 text-gray-400 hover:text-blue-600" />
                Tài khoản của bạn
            </a>
            <button 
                onClick={() => { console.log('Logging out...'); onClose(); }} 
                className="flex items-center w-full p-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors mt-1"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
            </button>
        </nav>
    </div>
);

export default ProfileDropdown;