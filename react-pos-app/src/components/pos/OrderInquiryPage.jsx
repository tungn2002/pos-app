import React, { useState } from 'react';
import { Search, Calendar, Package, User, MapPin, CreditCard, Filter } from 'lucide-react';

const OrderInquiryPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample order data
  const orders = [
    {
      id: 'DH001',
      customerName: 'Nguyễn Văn A',
      date: '2024-12-01',
      total: 850000,
      status: 'Hoàn thành',
      items: [
        { name: 'Áo khoác nam', quantity: 1, price: 500000 },
        { name: 'Quần jean', quantity: 1, price: 350000 }
      ],
      address: '123 Đường ABC, Quận 1, TP.HCM',
      paymentMethod: 'Thẻ tín dụng',
      notes: 'Giao hàng nhanh'
    },
    {
      id: 'DH002',
      customerName: 'Trần Thị B',
      date: '2024-12-02',
      total: 1200000,
      status: 'Hoàn thành',
      items: [
        { name: 'Đầm công sở', quantity: 2, price: 600000 }
      ],
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      paymentMethod: 'Tiền mặt',
      notes: ''
    },
    {
      id: 'DH003',
      customerName: 'Lê Văn C',
      date: '2024-12-03',
      total: 450000,
      status: 'Đang giao',
      items: [
        { name: 'Giày thể thao', quantity: 1, price: 450000 }
      ],
      address: '789 Đường DEF, Quận 5, TP.HCM',
      paymentMethod: 'Chuyển khoản',
      notes: 'Giao buổi chiều'
    },
    {
      id: 'DH004',
      customerName: 'Phạm Thị D',
      date: '2024-12-04',
      total: 2000000,
      status: 'Chưa thanh toán',
      items: [
        { name: 'Bộ quần áo nam', quantity: 1, price: 1200000 },
        { name: 'Áo sơ mi', quantity: 2, price: 400000 },
        { name: 'Thắt lưng', quantity: 1, price: 400000 }
      ],
      address: '321 Đường GHI, Quận 10, TP.HCM',
      paymentMethod: 'Chưa thanh toán',
      notes: ''
    }
  ];

  // Filter orders based on search term and date range
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const orderDate = new Date(order.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 shadow-lg">
        <div className="space-y-2">
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 bg-blue-100 text-blue-600">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* Left Panel - Search and Order List */}
        <div className="w-1/2 bg-white p-6 border-r border-gray-200 flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tra cứu đơn hàng</h1>
            
            {/* Search Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-3">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã đơn, tên khách hàng..."
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Date Range */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Calendar className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Calendar className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order List */}
          <div className="flex-grow overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Danh sách đơn hàng</h2>
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                    selectedOrder?.id === order.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-800">{order.id}</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                          order.status === 'Đang giao' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{order.total.toLocaleString('vi-VN')}₫</p>
                      <p className="text-xs text-gray-500">{order.items.length} sản phẩm</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Không tìm thấy đơn hàng nào
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Order Detail */}
        <div className="w-1/2 bg-white p-6">
          {selectedOrder ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
                  <p className="text-gray-600">#{selectedOrder.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedOrder.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'Đang giao' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Thông tin khách hàng</h3>
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Thông tin đơn hàng</h3>
                  <p className="mb-2"><span className="text-gray-600">Ngày đặt:</span> {selectedOrder.date}</p>
                  <p className="mb-2">
                    <span className="text-gray-600">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Danh sách sản phẩm</h3>
                <div className="border rounded-lg overflow-hidden">
                  {selectedOrder.items.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-3 ${
                        index !== selectedOrder.items.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Ghi chú</h3>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedOrder.total.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Chọn một đơn hàng để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInquiryPage;