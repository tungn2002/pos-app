import React, { useState, useEffect } from 'react';

const FundManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // For demo purposes, initialize with some documents
  useEffect(() => {
    const sampleDocuments = [
      {
        id: 1,
        value: 5000000,
        detail: 'Tiền bán hàng ngày',
        type: 'thu',
        date: '2024-12-01',
        code: 'TC001'
      },
      {
        id: 2,
        value: 2000000,
        detail: 'Chi phí văn phòng',
        type: 'chi',
        date: '2024-12-01',
        code: 'CC001'
      },
      {
        id: 3,
        value: 1500000,
        detail: 'Mua nguyên vật liệu',
        type: 'chi',
        date: '2024-12-02',
        code: 'CC002'
      },
      {
        id: 4,
        value: 3000000,
        detail: 'Thanh toán nhà cung cấp',
        type: 'chi',
        date: '2024-12-03',
        code: 'CC003'
      },
      {
        id: 5,
        value: 8000000,
        detail: 'Tiền từ khách hàng A',
        type: 'thu',
        date: '2024-12-03',
        code: 'TC002'
      },
      {
        id: 6,
        value: 1200000,
        detail: 'Chi phí đi lại',
        type: 'chi',
        date: '2024-12-04',
        code: 'CC004'
      },
      {
        id: 7,
        value: 4500000,
        detail: 'Doanh thu cuối tháng',
        type: 'thu',
        date: '2024-12-05',
        code: 'TC003'
      },
    ];
    setDocuments(sampleDocuments);
  }, []);

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc =>
    doc.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toString().includes(searchTerm) ||
    doc.value.toString().includes(searchTerm) ||
    doc.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  // Handle adding a new document
  const handleAddDocument = (docData) => {
    const newDocument = {
      id: Math.max(0, ...documents.map(d => d.id)) + 1,
      ...docData,
      date: new Date().toISOString().split('T')[0],
      code: docData.type === 'thu' ? `TC${String(new Date().getTime()).slice(-4)}` : `CC${String(new Date().getTime()).slice(-4)}`
    };
    setDocuments([...documents, newDocument]);
    setShowAddModal(false);
  };

  // Handle updating a document
  const handleUpdateDocument = (updatedDocument) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
    setShowEditModal(false);
  };

  // Handle deleting a document
  const handleDeleteDocument = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu này?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate totals based on filtered documents
  const totalThu = filteredDocuments.filter(doc => doc.type === 'thu').reduce((sum, doc) => sum + doc.value, 0);
  const totalChi = filteredDocuments.filter(doc => doc.type === 'chi').reduce((sum, doc) => sum + doc.value, 0);
  const ketQua = totalThu - totalChi;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sổ quỹ</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
        >
          Tạo phiếu mới
        </button>
      </div>

      {/* Formula display */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-center text-lg">
          <span className="font-medium text-gray-700">Tổng quỹ = </span>
          <span className="text-green-600 font-bold">{totalThu.toLocaleString()}đ</span>
          <span className="mx-2 text-gray-500">-</span>
          <span className="text-red-600 font-bold">{totalChi.toLocaleString()}đ</span>
          <span className="mx-2 text-gray-500">=</span>
          <span className={`font-bold ${ketQua >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {ketQua.toLocaleString()}đ
          </span>
          <span className="ml-4 font-medium text-gray-700">(Tồn quỹ)</span>
        </div>
      </div>

      {/* Search and filter area */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm phiếu..."
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

      {/* Document table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã chứng từ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại phiếu
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá trị
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chi tiết
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-300 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm font-medium text-gray-900">#{doc.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{doc.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{doc.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${doc.type === 'thu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doc.type === 'thu' ? 'Thu' : 'Chi'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className={`text-sm font-medium ${doc.type === 'thu' ? 'text-green-600' : 'text-red-600'}`}>
                    {doc.type === 'chi' ? '-' : '+'}{doc.value.toLocaleString()}đ
                  </div>
                </td>
                <td className="px-6 py-4 border-r border-gray-300">
                  <div className="text-sm text-gray-900 max-w-xs truncate" title={doc.detail}>
                    {doc.detail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentDocument(doc);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 mr-2 transition-colors font-medium"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
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
            Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredDocuments.length)}</span> trong tổng số <span className="font-medium">{filteredDocuments.length}</span> mục
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

      {/* Add Document Modal */}
      {showAddModal && (
        <AddDocumentModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddDocument}
        />
      )}

      {/* Edit Document Modal */}
      {showEditModal && currentDocument && (
        <EditDocumentModal
          document={currentDocument}
          onClose={() => {
            setShowEditModal(false);
            setCurrentDocument(null);
          }}
          onSave={handleUpdateDocument}
        />
      )}
    </div>
  );
};

// Add Document Modal Component
const AddDocumentModal = ({ onClose, onSave }) => {
  const [value, setValue] = useState('');
  const [detail, setDetail] = useState('');
  const [type, setType] = useState('thu'); // 'thu' or 'chi'
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && detail && code) {
      onSave({
        value: parseInt(value),
        detail: detail.trim(),
        type: type,
        code: code.trim()
      });
      setValue('');
      setDetail('');
      setType('thu');
      setCode('');
    }
  };

  // Generate default code when type changes
  useEffect(() => {
    const newCode = type === 'thu' ? `TC${String(new Date().getTime()).slice(-4)}` : `CC${String(new Date().getTime()).slice(-4)}`;
    setCode(newCode);
  }, [type]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/3 max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tạo phiếu mới</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã chứng từ <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã chứng từ"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại phiếu <span className="text-red-500">*</span></label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={type === 'thu'}
                  onChange={() => setType('thu')}
                />
                <span className="ml-2">Thu</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={type === 'chi'}
                  onChange={() => setType('chi')}
                />
                <span className="ml-2">Chi</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="0"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Nhập giá trị"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chi tiết <span className="text-red-500">*</span></label>
            <textarea
              rows="3"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Nhập chi tiết"
              required
            />
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
              Tạo phiếu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Document Modal Component
const EditDocumentModal = ({ document, onClose, onSave }) => {
  const [value, setValue] = useState(document?.value || '');
  const [detail, setDetail] = useState(document?.detail || '');
  const [type, setType] = useState(document?.type || 'thu');
  const [code, setCode] = useState(document?.code || '');

  useEffect(() => {
    if (document) {
      setValue(document.value);
      setDetail(document.detail);
      setType(document.type);
      setCode(document.code);
    }
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && detail && code) {
      onSave({
        ...document,
        value: parseInt(value),
        detail: detail.trim(),
        type: type,
        code: code.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/3 max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa phiếu #{document?.id}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã chứng từ <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã chứng từ"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại phiếu <span className="text-red-500">*</span></label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={type === 'thu'}
                  onChange={() => setType('thu')}
                />
                <span className="ml-2">Thu</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={type === 'chi'}
                  onChange={() => setType('chi')}
                />
                <span className="ml-2">Chi</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="0"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Nhập giá trị"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chi tiết <span className="text-red-500">*</span></label>
            <textarea
              rows="3"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Nhập chi tiết"
              required
            />
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

export default FundManagement;