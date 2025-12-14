import React, { useState } from 'react';
import { Search, Package, ShoppingCart, LayoutDashboard, BarChart2, User, MapPin, CreditCard, Package2 } from 'lucide-react';

const InventoryInquiryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample product data
  const products = [
    {
      id: 'SP001',
      name: 'Áo khoác nam cao cấp',
      category: 'Áo',
      brand: 'Local Brand',
      image: 'https://via.placeholder.com/80x80',
      price: 1200000,
      stock: 25,
      unit: 'cái',
      location: 'Kệ A1, Tầng 1',
      lastUpdated: '2024-12-01'
    },
    {
      id: 'SP002',
      name: 'Quần Jean nam dáng chuẩn',
      category: 'Quần',
      brand: 'Levi\'s',
      image: 'https://via.placeholder.com/80x80',
      price: 850000,
      stock: 15,
      unit: 'cái',
      location: 'Kệ B2, Tầng 2',
      lastUpdated: '2024-12-03'
    },
    {
      id: 'SP003',
      name: 'Giày thể thao nam',
      category: 'Giày',
      brand: 'Nike',
      image: 'https://via.placeholder.com/80x80',
      price: 1500000,
      stock: 8,
      unit: 'đôi',
      location: 'Kệ C3, Tầng 1',
      lastUpdated: '2024-12-02'
    },
    {
      id: 'SP004',
      name: 'Áo sơ mi công sở',
      category: 'Áo',
      brand: 'Uniqlo',
      image: 'https://via.placeholder.com/80x80',
      price: 650000,
      stock: 30,
      unit: 'cái',
      location: 'Kệ A2, Tầng 1',
      lastUpdated: '2024-12-04'
    },
    {
      id: 'SP005',
      name: 'Túi xách nữ thời trang',
      category: 'Phụ kiện',
      brand: 'Gucci',
      image: 'https://via.placeholder.com/80x80',
      price: 3200000,
      stock: 5,
      unit: 'cái',
      location: 'Kệ D1, Tầng 3',
      lastUpdated: '2024-12-01'
    },
    {
      id: 'SP006',
      name: 'Mũ lưỡi trai unisex',
      category: 'Phụ kiện',
      brand: 'Adidas',
      image: 'https://via.placeholder.com/80x80',
      price: 350000,
      stock: 40,
      unit: 'cái',
      location: 'Kệ E2, Tầng 2',
      lastUpdated: '2024-12-05'
    },
    {
      id: 'SP007',
      name: 'Thắt lưng da bò',
      category: 'Phụ kiện',
      brand: 'Hermès',
      image: 'https://via.placeholder.com/80x80',
      price: 2800000,
      stock: 12,
      unit: 'cái',
      location: 'Kệ F1, Tầng 1',
      lastUpdated: '2024-12-03'
    },
    {
      id: 'SP008',
      name: 'Áo phông cotton basic',
      category: 'Áo',
      brand: 'H&M',
      image: 'https://via.placeholder.com/80x80',
      price: 280000,
      stock: 50,
      unit: 'cái',
      location: 'Kệ G3, Tầng 2',
      lastUpdated: '2024-12-04'
    }
  ];

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 shadow-lg">
        <div className="space-y-2">
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center h-12 w-12 rounded-lg my-2 bg-blue-100 text-blue-600">
            <Package2 className="w-6 h-6" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Tra cứu tồn kho</h1>
          
          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên, mã, danh mục, thương hiệu..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Tìm kiếm theo tên sản phẩm, mã sản phẩm, danh mục hoặc thương hiệu</p>
          </div>

          {/* Products List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Danh sách sản phẩm <span className="text-gray-500 font-normal">({filteredProducts.length} sản phẩm)</span>
              </h2>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-150">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">Mã: {product.id}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-600">{product.price.toLocaleString('vi-VN')}₫</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Tồn: {product.stock} {product.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Danh mục:</span>
                        <span>{product.category}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Thương hiệu:</span>
                        <span>{product.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Vị trí:</span>
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500">Không tìm thấy sản phẩm nào</p>
                <p className="text-gray-400">Hãy thử với từ khóa khác</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryInquiryPage;