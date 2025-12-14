import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  X,
  ChevronDown,
  CreditCard,
  Package2,
  Star,
  DollarSign,
  Receipt,
  Printer,
  Check,
  AlertCircle,
  Filter,
  Grid3X3,
  List,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';

const NewPosPage = () => {
  const navigate = useNavigate();

  // State quản lý
  const [activeOrder, setActiveOrder] = useState('Đơn 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [orders, setOrders] = useState([
    { id: 1, name: 'Đơn 1', itemsCount: 2, total: 480000, status: 'active' },
    { id: 2, name: 'Đơn 2', itemsCount: 3, total: 765000, status: 'active' },
    { id: 3, name: 'Đơn 3', itemsCount: 1, total: 350000, status: 'completed' }
  ]);

  // Ref để in hóa đơn
  const receiptRef = useRef();
  
  // Dữ liệu mẫu cho sản phẩm
  const products = [
    { id: 1, name: 'Túi xách da cao cấp', price: 350000, category: 'accessories', stock: 15, rating: 4.8, image: null },
    { id: 2, name: 'Áo phông nam Cotton 100%', price: 130000, category: 'clothing', stock: 25, rating: 4.5, image: null },
    { id: 3, name: 'Dây đeo cổ tay thể thao', price: 45000, category: 'accessories', stock: 8, rating: 4.2, image: null },
    { id: 4, name: 'Giày thể thao nữ', price: 280000, category: 'footwear', stock: 12, rating: 4.7, image: null },
    { id: 5, name: 'Mũ thời trang nam', price: 85000, category: 'accessories', stock: 20, rating: 4.3, image: null },
    { id: 6, name: 'Quần jeans nam', price: 220000, category: 'clothing', stock: 18, rating: 4.6, image: null },
    { id: 7, name: 'Ví da thật', price: 150000, category: 'accessories', stock: 10, rating: 4.9, image: null },
    { id: 8, name: 'Áo khoác gió', price: 190000, category: 'clothing', stock: 14, rating: 4.4, image: null }
  ];

  // Danh mục sản phẩm
  const categories = [
    { id: 'all', name: 'Tất cả', count: products.length },
    { id: 'clothing', name: 'Quần áo', count: products.filter(p => p.category === 'clothing').length },
    { id: 'accessories', name: 'Phụ kiện', count: products.filter(p => p.category === 'accessories').length },
    { id: 'footwear', name: 'Giày dép', count: products.filter(p => p.category === 'footwear').length }
  ];

  // Dữ liệu giỏ hàng hiện tại
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Túi xách da cao cấp', price: 350000, quantity: 1, total: 350000 },
    { id: 2, name: 'Áo phông nam Cotton 100%', price: 130000, quantity: 1, total: 130000 }
  ]);

  // Tổng tiền hóa đơn
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.1; // 10%
  const tax = subtotal * taxRate;
  const discount = 0; // Giả định giảm giá là 0
  const totalAmount = subtotal + tax - discount;

  // Hàm tạo hóa đơn
  const generateReceipt = (orderId, paymentMethod) => {
    const receipt = {
      id: orderId,
      date: new Date().toLocaleString('vi-VN'),
      items: [...cartItems],
      subtotal: subtotal,
      tax: tax,
      discount: discount,
      total: totalAmount,
      paymentMethod: paymentMethod,
      cashier: 'Trung Nghĩa'
    };
    setCurrentReceipt(receipt);
    return receipt;
  };

  // Hàm xử lý thanh toán
  const handlePayment = () => {
    const receipt = generateReceipt(activeOrder, paymentMethod);
    setShowPaymentModal(false);

    // Xóa giỏ hàng sau khi thanh toán
    setCartItems([]);

    // Cập nhật trạng thái đơn hàng
    setOrders(orders.map(order =>
      order.name === activeOrder ? { ...order, status: 'completed' } : order
    ));

    // Hiển thị hóa đơn
    setShowReceiptModal(true);
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Lọc sản phẩm theo danh mục và tìm kiếm
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Component sản phẩm
  const ProductCard = ({ product }) => (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={() => addToCart(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          addToCart(product);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Thêm ${product.name} vào giỏ hàng. Giá ${product.price.toLocaleString('vi-VN')}₫`}
    >
      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">{product.price.toLocaleString('vi-VN')}₫</span>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">Còn lại: {product.stock} sản phẩm</div>
    </div>
  );

  // Component sản phẩm dạng danh sách
  const ProductListItem = ({ product }) => (
    <div
      className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      onClick={() => addToCart(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          addToCart(product);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Thêm ${product.name} vào giỏ hàng. Giá ${product.price.toLocaleString('vi-VN')}₫`}
    >
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center mr-3">
        <ShoppingCart className="w-6 h-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
          <span className="text-xs text-gray-600">{product.rating} • Còn {product.stock}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-blue-600">{product.price.toLocaleString('vi-VN')}₫</div>
      </div>
    </div>
  );

  // Component sản phẩm trong giỏ hàng
  const CartItem = ({ item }) => (
    <div className="p-3 mb-2 border-b border-gray-100 bg-gray-50/70 rounded-lg" aria-label={`Sản phẩm ${item.name}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <p className="font-semibold text-sm text-gray-800">{item.name}</p>
          <div className="text-xs text-blue-600 font-medium mt-1">
            {item.price.toLocaleString('vi-VN')}₫ × {item.quantity}
          </div>
        </div>

        <div className="flex items-center space-x-3 min-w-[180px]">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-gray-600 bg-white hover:bg-gray-100 transition-colors"
              aria-label={`Giảm số lượng ${item.name}`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span
              className="w-8 text-center text-sm font-medium bg-white"
              aria-label={`Số lượng ${item.name}`}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-gray-600 bg-white hover:bg-gray-100 transition-colors"
              aria-label={`Tăng số lượng ${item.name}`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-sm font-semibold text-right min-w-[60px]">
            <div>{item.total.toLocaleString('vi-VN')}₫</div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-600 bg-white border border-gray-300 p-1 rounded hover:bg-red-100 hover:text-red-500 transition-colors"
            aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Modal thanh toán
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Thanh toán hóa đơn</h3>
          <button
            onClick={() => setShowPaymentModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Thuế (10%)</span>
              <span>{tax.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Giảm giá</span>
              <span>-{discount.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
              <span>Tổng cộng</span>
              <span className="text-blue-600">{totalAmount.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức thanh toán</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'cash'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label="Chọn phương thức thanh toán tiền mặt"
                aria-pressed={paymentMethod === 'cash'}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Tiền mặt
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label="Chọn phương thức thanh toán thẻ"
                aria-pressed={paymentMethod === 'card'}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Thẻ
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Component hóa đơn/invoice
  const ReceiptModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Hóa đơn thanh toán</h3>
          <button
            onClick={() => setShowReceiptModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentReceipt && (
          <div className="space-y-4" ref={receiptRef}>
            <div className="text-center border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg">CỬA HÀNG BÁN LẺ</h4>
              <p className="text-sm text-gray-600">123 Đường ABC, Quận XYZ, TP.HCM</p>
              <p className="text-sm text-gray-600">ĐT: 0123 456 789</p>
            </div>

            <div className="text-sm">
              <div className="flex justify-between">
                <span>Mã hóa đơn:</span>
                <span className="font-medium">{currentReceipt.id}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Ngày giờ:</span>
                <span>{currentReceipt.date}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Nhân viên:</span>
                <span>{currentReceipt.cashier}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Phương thức:</span>
                <span className="capitalize">{currentReceipt.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <h5 className="font-semibold mb-2">Chi tiết hóa đơn</h5>
              <div className="space-y-1">
                {currentReceipt.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500"> x{item.quantity}</span>
                    </div>
                    <span>{item.total.toLocaleString('vi-VN')}₫</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{currentReceipt.subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Thuế (10%):</span>
                <span>{currentReceipt.tax.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Giảm giá:</span>
                <span>-{currentReceipt.discount.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{currentReceipt.total.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              Cảm ơn quý khách! Hẹn gặp lại!
            </div>
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => {
              // In hóa đơn
              const printWindow = window.open('', '_blank');
              printWindow.document.write(`
                <html>
                  <head>
                    <title>Hóa đơn ${currentReceipt?.id}</title>
                    <style>
                      body { font-family: Arial, sans-serif; margin: 20px; }
                      .receipt { max-width: 300px; margin: 0 auto; }
                      .header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; }
                      .details { margin: 10px 0; }
                      .items { margin: 10px 0; }
                      .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                      .total { margin-top: 10px; padding-top: 10px; border-top: 1px solid #000; font-weight: bold; }
                    </style>
                  </head>
                  <body>
                    <div class="receipt">
                      <div class="header">
                        <h2>CỬA HÀNG BÁN LẺ</h2>
                        <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                        <p>ĐT: 0123 456 789</p>
                      </div>
                      <div class="details">
                        <div>Mã hóa đơn: ${currentReceipt?.id}</div>
                        <div>Ngày giờ: ${currentReceipt?.date}</div>
                        <div>Nhân viên: ${currentReceipt?.cashier}</div>
                        <div>Phương thức: ${currentReceipt?.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}</div>
                      </div>
                      <div class="items">
                        <h4>Chi tiết hóa đơn</h4>
                        ${currentReceipt?.items.map(item => `
                          <div class="item">
                            <span>${item.name} x${item.quantity}</span>
                            <span>${item.total.toLocaleString('vi-VN')}₫</span>
                          </div>
                        `).join('')}
                      </div>
                      <div class="total">
                        <div class="item">
                          <span>Tạm tính:</span>
                          <span>${currentReceipt?.subtotal.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div class="item">
                          <span>Thuế (10%):</span>
                          <span>${currentReceipt?.tax.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div class="item">
                          <span>Giảm giá:</span>
                          <span>-${currentReceipt?.discount.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div class="item">
                          <span>Tổng cộng:</span>
                          <span>${currentReceipt?.total.toLocaleString('vi-VN')}₫</span>
                        </div>
                      </div>
                      <div style="text-align: center; margin-top: 20px; font-size: 12px;">
                        Cảm ơn quý khách! Hẹn gặp lại!
                      </div>
                    </div>
                  </body>
                </html>
              `);
              printWindow.document.close();
              printWindow.print();
            }}
            className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            In hóa đơn
          </button>
          <button
            onClick={() => setShowReceiptModal(false)}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar điều hướng */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col justify-between items-center py-4 shadow-sm">
        <div>
          <div className="flex justify-center items-center h-12 w-12 mb-6">
            <Package2 className="w-6 h-6 text-blue-600" />
          </div>
          {[
            { icon: ShoppingCart, label: 'Bán hàng', active: true, path: '/pos' },
            { icon: LayoutDashboard, label: 'Tổng quan', active: false, path: '/dashboard' },
            { icon: BarChart2, label: 'Báo cáo', active: false, path: '#' },
            { icon: Search, label: 'Tra cứu đơn', active: false, path: '/order-inquiry' },
            { icon: Package2, label: 'Tra cứu tồn kho', active: false, path: '/inventory-inquiry' },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center h-12 w-12 rounded-lg my-2 cursor-pointer transition-colors duration-200 ${
                item.active
                  ? 'bg-blue-100 text-blue-600 shadow-inner'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
              }`}
              title={item.label}
              onClick={() => {
                if(item.path && item.path !== '#') {
                  navigate(item.path);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if(item.path && item.path !== '#') {
                    navigate(item.path);
                  }
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={item.label}
              aria-current={item.active ? 'page' : 'false'}
            >
              <item.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Settings className="w-6 h-6 text-gray-500 hover:text-blue-600 cursor-pointer p-1" />
          <LogOut className="w-6 h-6 text-gray-500 hover:text-blue-600 cursor-pointer p-1" />
        </div>
      </aside>

      {/* Khu vực chính */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Thanh tìm kiếm */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm (F3)"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Điều khiển đơn hàng */}
              <div className="flex items-center space-x-2">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                      activeOrder === order.name
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveOrder(order.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveOrder(order.name);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Chuyển sang đơn ${order.name}`}
                    aria-current={activeOrder === order.name ? 'page' : 'false'}
                  >
                    <span>{order.name}</span>
                    <X
                      className="w-4 h-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrders(orders.filter(o => o.id !== order.id));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          setOrders(orders.filter(o => o.id !== order.id));
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Đóng đơn ${order.name}`}
                    />
                  </div>
                ))}
                <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thông tin người dùng */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Trung Nghĩa</span>
              </div>
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex overflow-hidden">
          {/* Cột trái - Danh mục sản phẩm */}
          <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
            {/* Tiêu đề và thanh công cụ */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Sản phẩm</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    aria-label="Chế độ hiển thị lưới"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    aria-label="Chế độ hiển thị danh sách"
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Danh mục sản phẩm */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Lọc theo danh mục ${category.name}`}
                    aria-pressed={selectedCategory === category.id}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="flex-grow overflow-y-auto p-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p>Không tìm thấy sản phẩm</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cột phải - Giỏ hàng và thanh toán */}
          <div className="w-2/3 flex flex-col">
            {/* Header giỏ hàng */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Giỏ hàng</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {cartItems.length} sản phẩm
                  </span>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <Printer className="w-4 h-4 mr-1" />
                    In hóa đơn
                  </button>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <Receipt className="w-4 h-4 mr-1" />
                    Hóa đơn
                  </button>
                </div>
              </div>
            </div>

            {/* Danh sách sản phẩm trong giỏ hàng */}
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p>Giỏ hàng trống</p>
                  <p className="text-sm mt-1">Chọn sản phẩm từ danh mục để thêm vào giỏ</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </>
              )}
            </div>

            {/* Tổng kết và thanh toán */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="text-right font-medium">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Thuế (10%)</span>
                  <span className="text-right font-medium">{tax.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="text-right font-medium text-green-600">-{discount.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="grid grid-cols-2">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-right text-lg font-bold text-blue-600">
                      {totalAmount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-3">
                  <button className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Hủy đơn
                  </button>
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Thanh toán (F9)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal thanh toán */}
      {showPaymentModal && <PaymentModal />}

      {/* Modal hóa đơn */}
      {showReceiptModal && <ReceiptModal />}
    </div>
  );
};

export default NewPosPage;