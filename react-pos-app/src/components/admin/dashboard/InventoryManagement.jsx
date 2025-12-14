import React, { useState, useEffect } from 'react';

const InventoryManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const itemsPerPage = 5;

  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ' },
    { value: 'received', label: 'Đã nhận' },
    { value: 'returned', label: 'Trả hàng' }
  ];

  // Sample inventory products
  const inventoryProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', sku: 'IP15PROMAX' },
    { id: 2, name: 'MacBook Air M2', sku: 'MBAM2' },
    { id: 3, name: 'AirPods Pro', sku: 'AIPRO' },
    { id: 4, name: 'Samsung Galaxy S24', sku: 'SSGS24' },
    { id: 5, name: 'iPad Pro', sku: 'IPADPRO' },
    { id: 6, name: 'Apple Watch Series 9', sku: 'AW9' },
    { id: 7, name: 'MacBook Pro M3', sku: 'MBPM3' },
  ];

  // For demo purposes, initialize with some orders
  useEffect(() => {
    const sampleOrders = [
      { 
        id: 1, 
        products: [
          { id: 1, name: 'iPhone 15 Pro Max', quantity: 2, unitPrice: 28000000, total: 56000000 },
          { id: 3, name: 'AirPods Pro', quantity: 5, unitPrice: 4500000, total: 22500000 }
        ],
        supplier: 'Công ty ABC',
        status: 'pending',
        date: '2024-12-01',
        totalAmount: 78500000
      },
      { 
        id: 2, 
        products: [
          { id: 2, name: 'MacBook Air M2', quantity: 3, unitPrice: 25000000, total: 75000000 }
        ],
        supplier: 'Công ty XYZ',
        status: 'received',
        date: '2024-12-02',
        totalAmount: 75000000
      },
      { 
        id: 3, 
        products: [
          { id: 4, name: 'Samsung Galaxy S24', quantity: 10, unitPrice: 20000000, total: 200000000 },
          { id: 5, name: 'iPad Pro', quantity: 2, unitPrice: 18000000, total: 36000000 }
        ],
        supplier: 'Công ty DEF',
        status: 'returned',
        date: '2024-12-03',
        totalAmount: 236000000
      },
      { 
        id: 4, 
        products: [
          { id: 6, name: 'Apple Watch Series 9', quantity: 7, unitPrice: 12000000, total: 84000000 }
        ],
        supplier: 'Công ty GHI',
        status: 'pending',
        date: '2024-12-04',
        totalAmount: 84000000
      },
      { 
        id: 5, 
        products: [
          { id: 7, name: 'MacBook Pro M3', quantity: 1, unitPrice: 45000000, total: 45000000 },
          { id: 1, name: 'iPhone 15 Pro Max', quantity: 1, unitPrice: 28000000, total: 28000000 }
        ],
        supplier: 'Công ty JKL',
        status: 'received',
        date: '2024-12-05',
        totalAmount: 73000000
      },
      { 
        id: 6, 
        products: [
          { id: 3, name: 'AirPods Pro', quantity: 12, unitPrice: 4500000, total: 54000000 }
        ],
        supplier: 'Công ty MNO',
        status: 'pending',
        date: '2024-12-06',
        totalAmount: 54000000
      },
    ];
    setOrders(sampleOrders);
  }, []);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Handle adding a new order
  const handleAddOrder = () => {
    if (selectedProducts.length > 0 && supplierName.trim()) {
      const newOrder = {
        id: Math.max(0, ...orders.map(o => o.id)) + 1,
        products: selectedProducts,
        supplier: supplierName,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        totalAmount: selectedProducts.reduce((sum, product) => sum + product.total, 0)
      };
      setOrders([...orders, newOrder]);
      setShowAddModal(false);
      setSelectedProducts([]);
      setSupplierName('');
    }
  };

  // Handle updating an order
  const handleUpdateOrder = (updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setShowEditModal(false);
  };

  // Handle deleting an order
  const handleDeleteOrder = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn đặt hàng này?')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý kho</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
        >
          Thêm đơn đặt hàng
        </button>
      </div>

      {/* Search, filter and action area */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative w-1/4">
          <input
            type="text"
            placeholder="Tìm kiếm nhà cung cấp..."
            className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="w-1/5">
          <select
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đặt
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhà cung cấp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-300 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{order.date}</div>
                </td>
                <td className="px-6 py-4 border-r border-gray-300">
                  <div className="text-sm text-gray-900 max-h-16 overflow-y-auto">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="mb-1 last:mb-0">
                        <span className="font-medium">{product.name}</span> - SL: {product.quantity}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{order.supplier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{order.totalAmount.toLocaleString()}đ</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="relative">
                    <select
                      className={`w-full p-2 rounded-lg border ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        order.status === 'received' ? 'bg-green-100 text-green-800 border-green-300' :
                        'bg-red-100 text-red-800 border-red-300'
                      }`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.slice(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentOrder(order);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 mr-2 transition-colors font-medium"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg border border-red-300 hover:bg-red-200 transition-colors font-medium"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> trong tổng số <span className="font-medium">{filteredOrders.length}</span> mục
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              Trước
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg border font-medium ${currentPage === page ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              Sau
            </button>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddModal && (
        <AddOrderModal
          onClose={() => {
            setShowAddModal(false);
            setSelectedProducts([]);
            setSupplierName('');
          }}
          onSave={handleAddOrder}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          supplierName={supplierName}
          setSupplierName={setSupplierName}
          inventoryProducts={inventoryProducts}
        />
      )}

      {/* Edit Order Modal */}
      {showEditModal && currentOrder && (
        <EditOrderModal
          order={currentOrder}
          onClose={() => {
            setShowEditModal(false);
            setCurrentOrder(null);
          }}
          onSave={handleUpdateOrder}
          inventoryProducts={inventoryProducts}
        />
      )}
    </div>
  );
};

// Add Order Modal Component
const AddOrderModal = ({ 
  onClose, 
  onSave, 
  selectedProducts, 
  setSelectedProducts, 
  supplierName, 
  setSupplierName, 
  inventoryProducts 
}) => {
  const [searchProduct, setSearchProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');

  const filteredProducts = inventoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleAddProduct = (product) => {
    if (quantity > 0 && unitPrice > 0) {
      const newProduct = {
        ...product,
        quantity: parseInt(quantity),
        unitPrice: parseInt(unitPrice),
        total: parseInt(quantity) * parseInt(unitPrice)
      };
      setSelectedProducts([...selectedProducts, newProduct]);
      setQuantity(1);
      setUnitPrice('');
      setSearchProduct('');
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-2/3 max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm đơn đặt hàng mới</h3>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Nhập tên nhà cung cấp"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tìm sản phẩm</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Tìm theo tên hoặc SKU"
              />
            </div>
            <div className="space-y-2">
              {filteredProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex justify-between items-center p-2 border border-gray-200 rounded">
                  <span>{product.name} ({product.sku})</span>
                  <button
                    type="button"
                    onClick={() => handleAddProduct(product)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Thêm
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Nhập số lượng"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá nhập</label>
              <input
                type="number"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Nhập đơn giá"
              />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-700 mb-2">Sản phẩm đã chọn</h4>
            {selectedProducts.length === 0 ? (
              <p className="text-gray-500">Chưa có sản phẩm nào được chọn</p>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.unitPrice?.toLocaleString()}đ</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.total?.toLocaleString()}đ</td>
                        <td className="px-4 py-2 text-sm">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(index)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Tổng tiền:</span>
              <span className="font-bold text-lg">{calculateTotal().toLocaleString()}đ</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-300 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 font-medium"
              disabled={selectedProducts.length === 0 || !supplierName.trim()}
            >
              Thêm đơn đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Order Modal Component
const EditOrderModal = ({ order, onClose, onSave, inventoryProducts }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [searchProduct, setSearchProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');

  useEffect(() => {
    if (order) {
      setEditedOrder({ ...order });
    }
  }, [order]);

  const filteredProducts = inventoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleAddProduct = (product) => {
    if (quantity > 0 && unitPrice > 0) {
      const newProduct = {
        ...product,
        quantity: parseInt(quantity),
        unitPrice: parseInt(unitPrice),
        total: parseInt(quantity) * parseInt(unitPrice)
      };
      setEditedOrder({
        ...editedOrder,
        products: [...editedOrder.products, newProduct]
      });
      setQuantity(1);
      setUnitPrice('');
      setSearchProduct('');
    }
  };

  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = [...editedOrder.products];
    updatedProducts.splice(indexToRemove, 1);
    setEditedOrder({
      ...editedOrder,
      products: updatedProducts
    });
  };

  const calculateTotal = () => {
    return editedOrder.products.reduce((sum, product) => sum + product.total, 0);
  };

  const handleSave = () => {
    const updatedOrder = {
      ...editedOrder,
      totalAmount: calculateTotal()
    };
    onSave(updatedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-2/3 max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa đơn đặt hàng #{order.id}</h3>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={editedOrder.supplier}
              onChange={(e) => setEditedOrder({ ...editedOrder, supplier: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tìm sản phẩm</label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Tìm theo tên hoặc SKU"
              />
            </div>
            <div className="space-y-2">
              {filteredProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex justify-between items-center p-2 border border-gray-200 rounded">
                  <span>{product.name} ({product.sku})</span>
                  <button
                    type="button"
                    onClick={() => handleAddProduct(product)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Thêm
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Nhập số lượng"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá nhập</label>
              <input
                type="number"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Nhập đơn giá"
              />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-700 mb-2">Sản phẩm trong đơn hàng</h4>
            {editedOrder.products.length === 0 ? (
              <p className="text-gray-500">Không có sản phẩm nào trong đơn hàng</p>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {editedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.unitPrice?.toLocaleString()}đ</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{product.total?.toLocaleString()}đ</td>
                        <td className="px-4 py-2 text-sm">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(index)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Tổng tiền:</span>
              <span className="font-bold text-lg">{calculateTotal().toLocaleString()}đ</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-300 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 font-medium"
            >
              Cập nhật đơn đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagement;