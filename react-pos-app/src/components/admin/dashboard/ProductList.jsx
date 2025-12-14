import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Tablet' },
    { id: 4, name: 'Phụ kiện' },
    { id: 5, name: 'Đồng hồ thông minh' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // For modal
  const [searchCategory, setSearchCategory] = useState(''); // For modal
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // For modal
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null); // For filter
  const [searchFilterCategory, setSearchFilterCategory] = useState(''); // For filter
  const [showFilterCategoryDropdown, setShowFilterCategoryDropdown] = useState(false); // For filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter categories for the filter dropdown based on search term
  const filteredFilterCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchFilterCategory.toLowerCase())
  );

  // For demo purposes, initialize with some products
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        image: 'https://placehold.co/100x100',
        name: 'iPhone 15 Pro Max',
        sku: 'IP15PROMAX',
        barcode: '8801234567890',
        description: 'iPhone 15 Pro Max chính hãng Apple',
        category: categories[0],
        stock: 25,
        sellingPrice: 25000000
      },
      {
        id: 2,
        image: 'https://placehold.co/100x100',
        name: 'MacBook Air M2',
        sku: 'MBAM2',
        barcode: '8801234567891',
        description: 'MacBook Air M2 chính hãng Apple',
        category: categories[1],
        stock: 15,
        sellingPrice: 35000000
      },
      {
        id: 3,
        image: 'https://placehold.co/100x100',
        name: 'AirPods Pro',
        sku: 'AIPRO',
        barcode: '8801234567892',
        description: 'Tai nghe không dây AirPods Pro',
        category: categories[3],
        stock: 40,
        sellingPrice: 5000000
      },
      {
        id: 4,
        image: 'https://placehold.co/100x100',
        name: 'Samsung Galaxy S24',
        sku: 'SSGS24',
        barcode: '8801234567893',
        description: 'Điện thoại Samsung Galaxy S24 chính hãng',
        category: categories[0],
        stock: 8,
        sellingPrice: 22000000
      },
      {
        id: 5,
        image: 'https://placehold.co/100x100',
        name: 'iPad Pro',
        sku: 'IPADPRO',
        barcode: '8801234567894',
        description: 'Máy tính bảng iPad Pro 12.9 inch',
        category: categories[2],
        stock: 12,
        sellingPrice: 28000000
      },
      {
        id: 6,
        image: 'https://placehold.co/100x100',
        name: 'Apple Watch Series 9',
        sku: 'AW9',
        barcode: '8801234567895',
        description: 'Đồng hồ thông minh Apple Watch Series 9',
        category: categories[4],
        stock: 22,
        sellingPrice: 12000000
      },
      {
        id: 7,
        image: 'https://placehold.co/100x100',
        name: 'MacBook Pro M3',
        sku: 'MBPM3',
        barcode: '8801234567896',
        description: 'MacBook Pro M3 chính hãng Apple',
        category: categories[1],
        stock: 10,
        sellingPrice: 45000000
      },
    ];
    setProducts(sampleProducts);
  }, [categories]);

  // Filter products based on search term and category filter
  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)) &&
    (!selectedFilterCategory || product.category.id === selectedFilterCategory.id)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Filter categories based on search term
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  // Reset pagination when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilterCategory]);

  // Handle clicks outside category filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const categoryFilterElement = document.getElementById('category-filter-dropdown');
      if (showFilterCategoryDropdown && categoryFilterElement && !categoryFilterElement.contains(event.target)) {
        setShowFilterCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterCategoryDropdown]);

  // Handle adding a new product
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      ...productData,
      image: productData.image || 'https://placehold.co/100x100',
      sellingPrice: Number(productData.sellingPrice) || 0
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  // Handle updating a product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id
        ? { ...product, sellingPrice: Number(updatedProduct.sellingPrice) || 0 }
        : product
    ));
    setShowEditModal(false);
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Search and filter area */}
      <div className="mb-6 flex justify-between items-center space-x-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
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

        {/* Category Filter */}
        <div className="w-1/4 relative" id="category-filter-dropdown">
          <div
            className={`p-3 pl-10 border-2 rounded-lg cursor-pointer flex justify-between items-center ${
              selectedFilterCategory ? 'border-gray-300' : 'border-gray-300'
            }`}
            onClick={() => setShowFilterCategoryDropdown(!showFilterCategoryDropdown)}
          >
            <div className="flex items-center">
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className={selectedFilterCategory ? 'text-gray-900' : 'text-gray-500'}>
                {selectedFilterCategory ? selectedFilterCategory.name : 'Tất cả danh mục'}
              </span>
            </div>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showFilterCategoryDropdown && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchFilterCategory}
                  onChange={(e) => setSearchFilterCategory(e.target.value)}
                />
              </div>
              <div className="max-h-40 overflow-y-auto">
                {/* All option */}
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    setSelectedFilterCategory(null);
                    setShowFilterCategoryDropdown(false);
                    setSearchFilterCategory('');
                  }}
                >
                  Tất cả danh mục
                </div>
                {filteredFilterCategories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedFilterCategory(category);
                      setShowFilterCategoryDropdown(false);
                      setSearchFilterCategory('');
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá bán
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tồn
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-300 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{product.category?.name || 'Chưa phân loại'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{product.sellingPrice?.toLocaleString('vi-VN')} ₫</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentProduct(product);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 mr-2 transition-colors font-medium"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
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
            Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> trong tổng số <span className="font-medium">{filteredProducts.length}</span> mục
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

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          showCategoryDropdown={showCategoryDropdown}
          setShowCategoryDropdown={setShowCategoryDropdown}
          filteredCategories={filteredCategories}
        />
      )}

      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <EditProductModal
          product={currentProduct}
          onClose={() => {
            setShowEditModal(false);
            setCurrentProduct(null);
          }}
          onSave={handleUpdateProduct}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          showCategoryDropdown={showCategoryDropdown}
          setShowCategoryDropdown={setShowCategoryDropdown}
          filteredCategories={filteredCategories}
        />
      )}
    </div>
  );
};

// Add Product Modal Component
const AddProductModal = ({
  onClose,
  onSave,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchCategory,
  setSearchCategory,
  showCategoryDropdown,
  setShowCategoryDropdown,
  filteredCategories
}) => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    sku: '',
    barcode: '',
    description: '',
    stock: 0,
    sellingPrice: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && formData.name.trim()) {
      onSave({
        ...formData,
        category: selectedCategory,
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        barcode: formData.barcode.trim(),
        description: formData.description.trim(),
        sellingPrice: Number(formData.sellingPrice) || 0
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/2 max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm sản phẩm mới</h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border border-gray-300"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Nhập mã SKU"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã vạch</label>
              <input
                type="text"
                name="barcode"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.barcode}
                onChange={handleInputChange}
                placeholder="Nhập mã vạch"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục <span className="text-red-500">*</span></label>
            <div className="relative">
              <div
                className={`p-3 border-2 rounded-lg cursor-pointer flex justify-between items-center ${
                  selectedCategory ? 'border-gray-300' : 'border-gray-300'
                }`}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedCategory ? selectedCategory.name : 'Chọn danh mục'}
                </span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tìm kiếm danh mục..."
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                            setSearchCategory('');
                          }}
                        >
                          {category.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">Không tìm thấy danh mục</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
              <input
                type="number"
                name="sellingPrice"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="Nhập giá bán"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số tồn kho</label>
              <input
                type="number"
                name="stock"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Nhập số lượng tồn kho"
              />
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
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Product Modal Component
const EditProductModal = ({
  product,
  onClose,
  onSave,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchCategory,
  setSearchCategory,
  showCategoryDropdown,
  setShowCategoryDropdown,
  filteredCategories
}) => {
  const [formData, setFormData] = useState({
    image: product?.image || '',
    name: product?.name || '',
    sku: product?.sku || '',
    barcode: product?.barcode || '',
    description: product?.description || '',
    stock: product?.stock || 0,
    sellingPrice: product?.sellingPrice || 0
  });

  useEffect(() => {
    if (product) {
      setFormData({
        image: product.image,
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        description: product.description,
        stock: product.stock,
        sellingPrice: product.sellingPrice
      });
      setSelectedCategory(product.category);
    }
  }, [product, setSelectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && formData.name.trim()) {
      onSave({
        ...product,
        ...formData,
        category: selectedCategory,
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        barcode: formData.barcode.trim(),
        description: formData.description.trim(),
        sellingPrice: Number(formData.sellingPrice) || 0
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/2 max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa sản phẩm</h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border border-gray-300"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Nhập mã SKU"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã vạch</label>
              <input
                type="text"
                name="barcode"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.barcode}
                onChange={handleInputChange}
                placeholder="Nhập mã vạch"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục <span className="text-red-500">*</span></label>
            <div className="relative">
              <div
                className={`p-3 border-2 rounded-lg cursor-pointer flex justify-between items-center ${
                  selectedCategory ? 'border-gray-300' : 'border-gray-300'
                }`}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedCategory ? selectedCategory.name : 'Chọn danh mục'}
                </span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tìm kiếm danh mục..."
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                            setSearchCategory('');
                          }}
                        >
                          {category.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">Không tìm thấy danh mục</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
              <input
                type="number"
                name="sellingPrice"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="Nhập giá bán"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số tồn kho</label>
              <input
                type="number"
                name="stock"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Nhập số lượng tồn kho"
              />
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductList;