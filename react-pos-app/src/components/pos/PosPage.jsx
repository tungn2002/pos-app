import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Tải các icon cần thiết từ lucide-react (giả định đã được cài đặt)
import {
  Search,
  Plus,
  ShoppingCart,
  LayoutDashboard,
  BarChart2,
  User,
  MapPin,
  Trash2,
  Minus,
  X, // Sử dụng X cho nút đóng tab
  ChevronDown,
  CreditCard,
  Package2
} from 'lucide-react';

// --- CÁC COMPONENT CON ---


// Component cho Hàng hóa trong giỏ hàng
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="p-3 mb-2 border-b border-blue-100 bg-blue-50/70">
      <div className="flex justify-between items-start">
        {/* Tên Sản phẩm */}
        <div className="flex-grow pr-4">
          <p className="font-semibold text-sm text-gray-800">{item.name}</p>
          <div className="mt-1 text-xs text-gray-500 flex flex-col space-y-1 bg-white p-2 rounded-md border border-blue-100">
            <span className="font-medium">Ghi chú:</span>
            <input
              type="text"
              placeholder="Thêm ghi chú..."
              className="w-full focus:outline-none bg-white rounded border-gray-300"
            />
          </div>
        </div>

        {/* Đơn giá, Số lượng, Thành tiền */}
        <div className="flex items-center space-x-4 min-w-[250px]">
          {/* Đơn giá */}
          <div className="text-sm w-16 text-right">
            <span className="text-gray-600">{item.unitPrice.toLocaleString('vi-VN')}₫</span>
          </div>

          {/* Input Số lượng */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-1.5 text-gray-600 bg-white hover:bg-gray-100 transition duration-150"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="w-8 text-center text-sm font-medium focus:outline-none bg-white"
            />
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="p-1.5 text-gray-600 bg-white hover:bg-gray-100 transition duration-150"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Thành tiền */}
          <div className="text-sm font-semibold w-16 text-right">
            <span>{(item.unitPrice * quantity).toLocaleString('vi-VN')}₫</span>
          </div>

          {/* Xóa */}
          <button className="text-gray-600 bg-white border border-gray-300 p-1 rounded hover:bg-gray-100 hover:text-red-500 transition duration-150">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Component chính của ứng dụng
const PosPage = () => {
  const navigate = useNavigate();
  // Thêm state để quản lý đơn hàng đang hoạt động
  const [activeOrder, setActiveOrder] = useState('Đơn 2');

  // Dữ liệu giả định cho giỏ hàng
  const cartItems = [
    { id: 1, name: 'Túi xách da cao cấp (Màu Đen, Size L)', unitPrice: 350000, quantity: 1, sku: 'TSX001' },
    { id: 2, name: 'Áo phông nam Cotton 100%', unitPrice: 130000, quantity: 3, sku: 'AP005' },
    { id: 3, name: 'Dây đeo cổ tay thể thao', unitPrice: 45000, quantity: 1, sku: 'DDC012' },
  ];

  // Tính toán tổng tiền
  const totalAmount = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = 0; // Giả định giảm giá là 0
  const finalAmount = totalAmount - discount;

  // Dữ liệu cho Sidebar Navigation
  const navItems = [
    { icon: ShoppingCart, label: 'Bán hàng', active: true },
    { icon: LayoutDashboard, label: 'Tổng quan', active: false },
    { icon: BarChart2, label: 'Báo cáo', active: false },
    { icon: Search, label: 'Tra cứu đơn', active: false },
    { icon: Package2, label: 'Tra cứu tồn kho', active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-inter">
      {/* 1. Sidebar Trái (Cố định) */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col justify-between items-center py-4 shadow-lg">
        <div>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex justify-center items-center h-12 w-12 rounded-lg my-2 cursor-pointer transition duration-200 ${
                item.active
                  ? 'bg-blue-100 text-blue-600 shadow-inner'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
              }`}
              title={item.label}
              onClick={() => {
                if(item.label === 'Tra cứu đơn') {
                  navigate('/order-inquiry');
                } else if(item.label === 'Tra cứu tồn kho') {
                  navigate('/inventory-inquiry');
                }
              }}
            >
              <item.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </aside>

      {/* 2. Khu vực Nội dung Chính (Header + Main Area) */}
      <div className="flex-grow flex flex-col">
        {/* Header/Top Bar */}
        <header className="bg-blue-600 text-white p-3 shadow-md z-10 flex items-center justify-between min-h-[50px]">
          <div className="flex items-center space-x-4 flex-grow max-w-2xl">
            {/* Input tìm kiếm sản phẩm */}
            <div className="flex items-center bg-white text-gray-800 rounded-md overflow-hidden flex-grow max-w-lg border border-gray-300">
              <Search className="w-5 h-5 text-gray-600 ml-3" />
              <input
                type="text"
                placeholder="Nhập tên sản phẩm hoặc mã SKU (F3)"
                className="w-full p-2 text-sm text-gray-800 focus:outline-none bg-white"
              />
            </div>
            {/* Thao tác Đơn hàng */}
            <div className="flex items-center space-x-2">
              {/* Order Tabs - Đơn 2 (Đang hoạt động) */}
              <div
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-semibold text-sm cursor-pointer transition duration-150 ${
                  activeOrder === 'Đơn 2'
                    ? 'bg-white text-blue-600' // Active style: nền trắng, chữ xanh
                    : 'bg-blue-700/70 text-white hover:bg-blue-700'  // Inactive style: nền xanh trong suốt, chữ trắng
                }`}
                onClick={() => setActiveOrder('Đơn 2')}
              >
                <span>Đơn 2</span>
                {/* Nút Đóng Tab */}
                <button
                  className={`p-0.5 rounded-full transition duration-150 ${activeOrder === 'Đơn 2' ? 'text-gray-400 hover:text-red-500' : 'text-white hover:text-red-300'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Add New Order Button */}
              <button className="p-1.5 bg-blue-700/70 rounded-md hover:bg-blue-700 transition duration-150">
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Access Icons */}
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 cursor-pointer text-white hover:text-blue-200" title="Tài khoản" />
          </div>
        </header>

        {/* Main Content Area (Layout grid 3/4 + 1/4) */}
        <main className="flex-grow p-4 grid grid-cols-4 gap-4 overflow-hidden">
          {/* Cột 1: Chi tiết đơn hàng (3/4 chiều rộng) */}
          <div className="col-span-3 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Header Cột */}
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 px-3 py-2 bg-gray-50 border-b border-gray-200">
              <span className="w-1/2">Sản phẩm</span>
              <div className="flex justify-between w-1/2 text-right pr-12">
                <span className="w-1/4">Đơn giá</span>
                <span className="w-1/4">Số lượng</span>
                <span className="w-1/4">Thành tiền</span>
                <span className="w-1/4"></span> {/* Cho icon Xóa */}
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="flex-grow overflow-y-auto">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Footer thao tác và thông tin */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center border border-gray-300 rounded-lg p-2 text-sm bg-white">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="flex-grow">Nhân viên: Trung Nghĩa</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Cột 2: Thanh toán & Khách hàng (1/4 chiều rộng) */}
          <div className="col-span-1 flex flex-col space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="text-sm">
                {/* Khách phải trả */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold">Khách phải trả ({cartItems.length} sản phẩm)</span>
                  <span className="text-xl font-bold text-blue-600">{finalAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="auto-invoice" className="font-medium text-gray-700 cursor-pointer flex items-center">
                  <input
                    type="checkbox"
                    id="auto-invoice"
                    defaultChecked
                    className="mr-2 text-blue-600 form-checkbox h-4 w-4 rounded border-gray-300 focus:ring-blue-500 bg-white"
                  />
                  In hóa đơn tự động
                </label>
                <span className="text-xs text-gray-400">F10</span>
              </div>
              <button className="flex items-center justify-center bg-white text-gray-800 border border-gray-300 text-lg font-bold py-3 rounded-xl hover:bg-gray-100 transition duration-150 shadow">
                <CreditCard className="w-6 h-6 mr-3" />
                Thanh toán <span className="text-sm ml-2 font-light">F9</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PosPage;