import React, { useState, useEffect } from 'react';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const itemsPerPage = 5;

  // For demo purposes, initialize with some categories
  useEffect(() => {
    const sampleCategories = [
      { id: 1, name: 'Điện thoại' },
      { id: 2, name: 'Laptop' },
      { id: 3, name: 'Tablet' },
      { id: 4, name: 'Phụ kiện' },
      { id: 5, name: 'Đồng hồ thông minh' },
      { id: 6, name: 'Máy tính bảng' },
      { id: 7, name: 'Tai nghe' },
      { id: 8, name: 'Loa' },
    ];
    setCategories(sampleCategories);
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  // Handle adding a new category
  const handleAddCategory = (newCategoryName) => {
    const newCategory = {
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      name: newCategoryName
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  // Handle updating a category
  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
    setShowEditModal(false);
  };

  // Handle deleting a category
  const handleDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh mục sản phẩm</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
        >
          Thêm danh mục
        </button>
      </div>

      {/* Search and filter area */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
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
      </div>

      {/* Empty state or category list */}
      {currentCategories.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Bạn chưa có danh mục</h3>
          <p className="text-gray-500 mb-6">Hãy tạo danh mục đầu tiên cho cửa hàng của bạn</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
          >
            Thêm danh mục
          </button>
        </div>
      ) : (
        <>
          {/* Category table */}
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">
                    Tên danh mục
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {currentCategories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-300 last:border-b-0">
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setCurrentCategory(category);
                          setShowEditModal(true);
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 mr-2 transition-colors font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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
                Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredCategories.length)}</span> trong tổng số <span className="font-medium">{filteredCategories.length}</span> mục
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
        </>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCategory}
        />
      )}

      {/* Edit Category Modal */}
      {showEditModal && currentCategory && (
        <EditCategoryModal
          category={currentCategory}
          onClose={() => {
            setShowEditModal(false);
            setCurrentCategory(null);
          }}
          onSave={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;