import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, Calendar, CreditCard, User, MapPin, Trash2, RotateCcw, AlertCircle, Plus, Edit3, X } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemNote, setItemNote] = useState('');
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Tiền mặt',
    status: 'Chờ thanh toán',
    items: [],
    notes: '',
    discount: 0,
    shippingFee: 0
  });

  // Sample order data
  useEffect(() => {
    const sampleOrders = [
      {
        id: 'DH001',
        orderDate: '2024-12-01',
        orderTime: '09:30',
        totalAmount: 1250000,
        status: 'Hoàn thành',
        customerName: 'Nguyễn Văn A',
        paymentMethod: 'Thẻ tín dụng',
        items: [
          { name: 'Áo khoác nam', quantity: 1, price: 500000, total: 500000, note: 'Size L', color: 'Đen' },
          { name: 'Quần jean', quantity: 1, price: 350000, total: 350000, note: 'Size M', color: '' },
          { name: 'Áo sơ mi', quantity: 2, price: 200000, total: 400000, note: 'Size S', color: 'Trắng' }
        ],
        address: '123 Đường ABC, Quận 1, TP.HCM',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        notes: 'Giao hàng nhanh',
        discount: 0,
        shippingFee: 30000
      },
      {
        id: 'DH002',
        orderDate: '2024-12-01',
        orderTime: '10:15',
        totalAmount: 850000,
        status: 'Đang xử lý',
        customerName: 'Trần Thị B',
        paymentMethod: 'Tiền mặt',
        items: [
          { name: 'Đầm công sở', quantity: 1, price: 600000, total: 600000, note: 'Size M', color: '' },
          { name: 'Giày cao gót', quantity: 1, price: 250000, total: 250000, note: '', color: 'Đỏ' }
        ],
        address: '456 Đường XYZ, Quận 3, TP.HCM',
        email: 'tranthib@example.com',
        phone: '0987654321',
        notes: '',
        discount: 50000,
        shippingFee: 0
      },
      {
        id: 'DH003',
        orderDate: '2024-12-02',
        orderTime: '14:20',
        totalAmount: 2200000,
        status: 'Đang giao',
        customerName: 'Lê Văn C',
        paymentMethod: 'Chuyển khoản',
        items: [
          { name: 'Bộ suit nam', quantity: 1, price: 1500000, total: 1500000, note: 'Size L', color: '' },
          { name: 'Cà vạt', quantity: 2, price: 250000, total: 500000, note: '', color: 'Xanh đen' },
          { name: 'Áo sơ mi trắng', quantity: 1, price: 200000, total: 200000, note: 'Size M', color: 'Trắng' }
        ],
        address: '789 Đường DEF, Quận 5, TP.HCM',
        email: 'levanc@example.com',
        phone: '0112233445',
        notes: 'Giao buổi chiều',
        discount: 0,
        shippingFee: 30000
      },
      {
        id: 'DH004',
        orderDate: '2024-12-02',
        orderTime: '16:45',
        totalAmount: 450000,
        status: 'Đã hủy',
        customerName: 'Phạm Thị D',
        paymentMethod: 'Ví điện tử',
        items: [
          { name: 'Giày thể thao', quantity: 1, price: 450000, total: 450000, note: 'Size 40', color: '' }
        ],
        address: '321 Đường GHI, Quận 10, TP.HCM',
        email: 'phamthid@example.com',
        phone: '0998877665',
        notes: '',
        discount: 0,
        shippingFee: 0
      },
      {
        id: 'DH005',
        orderDate: '2024-12-03',
        orderTime: '11:30',
        totalAmount: 1800000,
        status: 'Hoàn thành',
        customerName: 'Hoàng Minh E',
        paymentMethod: 'Thẻ tín dụng',
        items: [
          { name: 'Áo khoác dạ', quantity: 1, price: 1200000, total: 1200000, note: 'Size M', color: '' },
          { name: 'Mũ len', quantity: 2, price: 300000, total: 600000, note: '', color: 'Xám' }
        ],
        address: '654 Đường JKL, Quận Phú Nhuận, TP.HCM',
        email: 'hoangmine@example.com',
        phone: '0334455667',
        notes: '',
        discount: 100000,
        shippingFee: 30000
      },
      {
        id: 'DH006',
        orderDate: '2024-12-03',
        orderTime: '13:10',
        totalAmount: 950000,
        status: 'Đang xử lý',
        customerName: 'Vũ Thị F',
        paymentMethod: 'Tiền mặt',
        items: [
          { name: 'Chân váy bút chì', quantity: 1, price: 400000, total: 400000, note: 'Size S', color: '' },
          { name: 'Áo len cổ lọ', quantity: 1, price: 550000, total: 550000, note: 'Size M', color: 'Đỏ đô' }
        ],
        address: '987 Đường MNO, Quận Bình Thạnh, TP.HCM',
        email: 'vuthif@example.com',
        phone: '0778899001',
        notes: 'Không cần túi',
        discount: 0,
        shippingFee: 0
      },
      {
        id: 'DH007',
        orderDate: '2024-12-04',
        orderTime: '08:55',
        totalAmount: 1400000,
        status: 'Hoàn thành',
        customerName: 'Đỗ Văn G',
        paymentMethod: 'Chuyển khoản',
        items: [
          { name: 'Balo chống nước', quantity: 1, price: 600000, total: 600000, note: '', color: 'Xanh' },
          { name: 'Túi đeo chéo', quantity: 1, price: 400000, total: 400000, note: '', color: 'Đen' },
          { name: 'Ví da', quantity: 1, price: 400000, total: 400000, note: '', color: 'Nâu' }
        ],
        address: '147 Đường PQR, Quận Gò Vấp, TP.HCM',
        email: 'dovang@example.com',
        phone: '0556677889',
        notes: '',
        discount: 0,
        shippingFee: 30000
      },
      {
        id: 'DH008',
        orderDate: '2024-12-04',
        orderTime: '15:20',
        totalAmount: 750000,
        status: 'Chờ thanh toán',
        customerName: 'Bùi Thị H',
        paymentMethod: 'Chưa thanh toán',
        items: [
          { name: 'Mũ lưỡi trai', quantity: 1, price: 200000, total: 200000, note: '', color: 'Trắng' },
          { name: 'Áo thun basic', quantity: 2, price: 275000, total: 550000, note: 'Size M, 2 chiếc', color: '' }
        ],
        address: '258 Đường STU, Quận Tân Bình, TP.HCM',
        email: 'buithih@example.com',
        phone: '0321654987',
        notes: 'Hàng dễ vỡ',
        discount: 0,
        shippingFee: 0
      },
      {
        id: 'DH009',
        orderDate: '2024-12-05',
        orderTime: '10:00',
        totalAmount: 2100000,
        status: 'Hoàn thành',
        customerName: 'Lý Văn I',
        paymentMethod: 'Thẻ tín dụng',
        items: [
          { name: 'Đồng hồ nam', quantity: 1, price: 1500000, total: 1500000, note: 'Mặt trắng', color: '' },
          { name: 'Dây đồng hồ', quantity: 2, price: 300000, total: 600000, note: 'Dây da nâu', color: 'Nâu' }
        ],
        address: '369 Đường VWX, Quận 11, TP.HCM',
        email: 'lyvani@example.com',
        phone: '0147258369',
        notes: 'Gói quà giúp',
        discount: 0,
        shippingFee: 30000
      },
      {
        id: 'DH010',
        orderDate: '2024-12-05',
        orderTime: '17:30',
        totalAmount: 320000,
        status: 'Đang giao',
        customerName: 'Ngô Thị K',
        paymentMethod: 'Tiền mặt',
        items: [
          { name: 'Khăn choàng', quantity: 1, price: 320000, total: 320000, note: '', color: 'Đỏ' }
        ],
        address: '159 Đường YZA, Quận Thủ Đức, TP.HCM',
        email: 'ngothik@example.com',
        phone: '0963852741',
        notes: '',
        discount: 0,
        shippingFee: 0
      },
      {
        id: 'DH011',
        orderDate: '2024-12-06',
        orderTime: '09:15',
        totalAmount: 1650000,
        status: 'Hoàn thành',
        customerName: 'Trịnh Văn L',
        paymentMethod: 'Chuyển khoản',
        items: [
          { name: 'Áo khoác gió', quantity: 1, price: 700000, total: 700000, note: 'Size L', color: '' },
          { name: 'Quần thể thao', quantity: 1, price: 450000, total: 450000, note: 'Size M', color: '' },
          { name: 'Áo thun thể thao', quantity: 2, price: 250000, total: 500000, note: 'Size S', color: '' }
        ],
        address: '753 Đường BCD, Quận 4, TP.HCM',
        email: 'trinhvanl@example.com',
        phone: '0852963741',
        notes: 'Giao trong giờ hành chính',
        discount: 0,
        shippingFee: 30000
      },
      {
        id: 'DH012',
        orderDate: '2024-12-06',
        orderTime: '14:45',
        totalAmount: 980000,
        status: 'Chờ thanh toán',
        customerName: 'Phan Thị M',
        paymentMethod: 'Chưa thanh toán',
        items: [
          { name: 'Mắt kính râm', quantity: 1, price: 480000, total: 480000, note: 'Gọng đen', color: 'Đen' },
          { name: 'Dây nịt', quantity: 1, price: 500000, total: 500000, note: 'Dây da thật', color: '' }
        ],
        address: '852 Đường EFG, Quận 6, TP.HCM',
        email: 'phanthim@example.com',
        phone: '0741852963',
        notes: '',
        discount: 0,
        shippingFee: 0
      }
    ];

    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  // Filter orders based on search term and status
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter, orders]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'Chờ thanh toán', label: 'Chờ thanh toán' },
    { value: 'Đang xử lý', label: 'Đang xử lý' },
    { value: 'Đang giao', label: 'Đang giao' },
    { value: 'Hoàn thành', label: 'Hoàn thành' },
    { value: 'Đã hủy', label: 'Đã hủy' }
  ];

  // Handle order selection
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (orderToDelete) {
      setOrders(orders.filter(order => order.id !== orderToDelete.id));
      setFilteredOrders(filteredOrders.filter(order => order.id !== orderToDelete.id));
      if (selectedOrder && selectedOrder.id === orderToDelete.id) {
        setSelectedOrder(null);
      }
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  // Handle return order (for future implementation)
  const handleReturnOrder = (order) => {
    alert(`Chức năng trả hàng cho đơn ${order.id} sẽ được triển khai trong phiên bản tiếp theo.`);
  };

  // Update item note and color
  const updateItemNote = () => {
    if (editingItem) {
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.id === editingItem.orderId) {
            const updatedItems = order.items.map((item, idx) => {
              if (idx === editingItem.index) {
                return { ...item, note: itemNote, color: editingItem.color };
              }
              return item;
            });
            return { ...order, items: updatedItems };
          }
          return order;
        })
      );

      // Also update the selected order if it's currently displayed
      if (selectedOrder && selectedOrder.id === editingItem.orderId) {
        const updatedItems = selectedOrder.items.map((item, idx) => {
          if (idx === editingItem.index) {
            return { ...item, note: itemNote, color: editingItem.color };
          }
          return item;
        });
        setSelectedOrder({ ...selectedOrder, items: updatedItems });
      }

      setShowEditModal(false);
      setEditingItem(null);
      setItemNote('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Package className="w-6 h-6 mr-2 text-blue-600" />
            Quản lý đơn hàng
          </h1>
          <p className="text-gray-600">Quản lý và theo dõi các đơn hàng của khách hàng</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(true);
                  setNewOrder({
                    customerName: '',
                    email: '',
                    phone: '',
                    address: '',
                    paymentMethod: 'Tiền mặt',
                    status: 'Chờ thanh toán',
                    items: [],
                    notes: '',
                    discount: 0,
                    shippingFee: 0
                  });
                }}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150">
                <Plus className="w-4 h-4 mr-2" />
                Thêm đơn
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Order List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã đơn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày mua
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giờ mua
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thành tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleOrderClick(order)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.orderDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.orderTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.totalAmount.toLocaleString('vi-VN')}₫
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                            order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Đang giao' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Chờ thanh toán' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent the row click event
                              handleDeleteClick(order);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Không tìm thấy đơn hàng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Sau
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> đến{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastOrder, filteredOrders.length)}
                      </span> trong tổng số{' '}
                      <span className="font-medium">{filteredOrders.length}</span> đơn hàng
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Trước
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa đơn hàng</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Bạn có chắc chắn muốn xóa đơn hàng <strong>#{orderToDelete?.id}</strong>? 
              Hành động này không thể hoàn tác và sản phẩm liên quan đến phần báo cáo sẽ không còn được tính trong báo cáo.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setOrderToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Note Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sửa thông tin sản phẩm</h3>
            <p className="text-gray-600 mb-2"><strong>{editingItem?.name}</strong></p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 min-h-[100px] mb-3"
              placeholder="Nhập ghi chú cho sản phẩm..."
              value={itemNote}
              onChange={(e) => setItemNote(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="Màu sắc sản phẩm..."
              value={editingItem?.color || ''}
              onChange={(e) => setEditingItem({...editingItem, color: e.target.value})}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                  setItemNote('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={updateItemNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                  <p className="text-gray-600">Ngày: {selectedOrder.orderDate} | Giờ: {selectedOrder.orderTime}</p>
                </div>
                <button
                  onClick={() => {
                    setShowOrderDetailModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Thông tin khách hàng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <p><span className="text-gray-600">Tên khách hàng:</span> {selectedOrder.customerName}</p>
                  <p><span className="text-gray-600">Email:</span> {selectedOrder.email}</p>
                  <p><span className="text-gray-600">Số điện thoại:</span> {selectedOrder.phone}</p>
                  <p><span className="text-gray-600">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">Địa chỉ:</p>
                  <p>{selectedOrder.address}</p>
                </div>
                {selectedOrder.notes && (
                  <div className="mt-2">
                    <p className="text-gray-600">Ghi chú:</p>
                    <p>{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Chi tiết sản phẩm
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-3 ${
                        index !== selectedOrder.items.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                        {item.color && (
                          <p className="text-sm text-gray-600"><span className="font-medium">Màu sắc:</span> {item.color}</p>
                        )}
                        {item.note && (
                          <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Ghi chú:</span> {item.note}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')}₫ x {item.quantity}</p>
                          <p className="font-semibold">{item.total.toLocaleString('vi-VN')}₫</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingItem({ ...item, index, orderId: selectedOrder.id });
                            setItemNote(item.note || '');
                            setShowEditModal(true);
                            setShowOrderDetailModal(false); // Close the main modal temporarily
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{(selectedOrder.totalAmount - selectedOrder.shippingFee - selectedOrder.discount).toLocaleString('vi-VN')}₫</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="text-red-600">-{selectedOrder.discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>{selectedOrder.shippingFee > 0 ? selectedOrder.shippingFee.toLocaleString('vi-VN') : 'Miễn phí'}₫</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedOrder.totalAmount.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleReturnOrder(selectedOrder)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Trả hàng
                </button>
                <button
                  onClick={() => {
                    setOrderToDelete(selectedOrder);
                    setShowDeleteModal(true);
                    setShowOrderDetailModal(false); // Close the main modal temporarily
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Tạo đơn hàng mới</h2>
                  <p className="text-gray-600">Nhập thông tin chi tiết cho đơn hàng mới</p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                    placeholder="Nhập tên khách hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({...newOrder, email: e.target.value})}
                    placeholder="Nhập email khách hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={newOrder.paymentMethod}
                    onChange={(e) => setNewOrder({...newOrder, paymentMethod: e.target.value})}
                  >
                    <option value="Tiền mặt">Tiền mặt</option>
                    <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                    <option value="Chuyển khoản">Chuyển khoản</option>
                    <option value="Ví điện tử">Ví điện tử</option>
                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng *</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    rows="3"
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({...newOrder, address: e.target.value})}
                    placeholder="Nhập địa chỉ giao hàng"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                  >
                    <option value="Chờ thanh toán">Chờ thanh toán</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phí vận chuyển (₫)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={newOrder.shippingFee}
                    onChange={(e) => setNewOrder({...newOrder, shippingFee: Number(e.target.value)})}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    rows="2"
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                    placeholder="Nhập ghi chú cho đơn hàng"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá (₫)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={newOrder.discount}
                    onChange={(e) => setNewOrder({...newOrder, discount: Number(e.target.value)})}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Danh sách sản phẩm
                  </h3>
                </div>

                {newOrder.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Chưa có sản phẩm nào được thêm</p>
                    <p className="text-sm">Hãy thêm sản phẩm vào đơn hàng</p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    {newOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col md:flex-row justify-between items-start md:items-center p-3 ${
                          index !== newOrder.items.length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                      >
                        <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                          {item.color && (
                            <p className="text-sm text-gray-600"><span className="font-medium">Màu sắc:</span> {item.color}</p>
                          )}
                          {item.note && (
                            <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Ghi chú:</span> {item.note}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between w-full md:w-auto">
                          <div className="text-right mr-4">
                            <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')}₫ x {item.quantity}</p>
                            <p className="font-semibold">{item.total.toLocaleString('vi-VN')}₫</p>
                          </div>
                          <button
                            onClick={() => {
                              // Remove item from the list
                              const updatedItems = [...newOrder.items];
                              updatedItems.splice(index, 1);
                              setNewOrder({...newOrder, items: updatedItems});
                            }}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Item Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      // Simple dialog to add an item (in a real app, you might have a more complex interface)
                      const itemName = prompt("Tên sản phẩm:");
                      if (!itemName) return;

                      const quantityStr = prompt("Số lượng:");
                      const quantity = parseInt(quantityStr);
                      if (isNaN(quantity) || quantity <= 0) {
                        alert("Số lượng không hợp lệ");
                        return;
                      }

                      const priceStr = prompt("Đơn giá (VNĐ):");
                      const price = parseInt(priceStr);
                      if (isNaN(price) || price < 0) {
                        alert("Đơn giá không hợp lệ");
                        return;
                      }

                      const note = prompt("Ghi chú (nếu có):") || "";
                      const color = prompt("Màu sắc (nếu có):") || "";

                      const newItem = {
                        name: itemName,
                        quantity: quantity,
                        price: price,
                        total: price * quantity,
                        note: note,
                        color: color  // Add color field
                      };

                      setNewOrder({
                        ...newOrder,
                        items: [...newOrder.items, newItem]
                      });
                    }}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sản phẩm
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{newOrder.items.reduce((sum, item) => sum + item.total, 0).toLocaleString('vi-VN')}₫</span>
                </div>
                {newOrder.discount > 0 && (
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="text-red-600">-{newOrder.discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                {newOrder.shippingFee > 0 && (
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>{newOrder.shippingFee.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {(newOrder.items.reduce((sum, item) => sum + item.total, 0) - newOrder.discount + newOrder.shippingFee).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    // Validate required fields
                    if (!newOrder.customerName || !newOrder.phone || !newOrder.address) {
                      alert("Vui lòng điền đầy đủ thông tin bắt buộc (Tên khách hàng, Số điện thoại, Địa chỉ)");
                      return;
                    }

                    if (newOrder.items.length === 0) {
                      alert("Vui lòng thêm ít nhất một sản phẩm vào đơn hàng");
                      return;
                    }

                    const newOrderWithId = {
                      ...newOrder,
                      id: `DH${String(orders.length + 1).padStart(3, '0')}`,
                      orderDate: new Date().toISOString().split('T')[0],
                      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      totalAmount: newOrder.items.reduce((sum, item) => sum + item.total, 0) - newOrder.discount + newOrder.shippingFee
                    };

                    setOrders([...orders, newOrderWithId]);
                    setShowAddModal(false);

                    // Reset the form
                    setNewOrder({
                      customerName: '',
                      email: '',
                      phone: '',
                      address: '',
                      paymentMethod: 'Tiền mặt',
                      status: 'Chờ thanh toán',
                      items: [],
                      notes: '',
                      discount: 0,
                      shippingFee: 0
                    });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  Lưu đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;