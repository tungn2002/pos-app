import React, { useState, useEffect } from 'react';

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'permissions'

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Nhân viên</h2>
      </div>

      {/* Tab navigation */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-3 px-6 font-medium text-sm border-b-2 rounded-t-lg ${
            activeTab === 'list'
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-transparent text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('list')}
        >
          Danh sách nhân viên
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm border-b-2 rounded-t-lg ${
            activeTab === 'permissions'
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-transparent text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('permissions')}
        >
          Phân quyền
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'list' ? <EmployeeList /> : <PermissionManagement />}
    </div>
  );
};

// Employee List Component
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // For demo purposes, initialize with some employees
  useEffect(() => {
    const sampleEmployees = [
      { id: 1, name: 'Nguyễn Văn A', phone: '0123456789', role: 'Quản lý' },
      { id: 2, name: 'Trần Thị B', phone: '0987654321', role: 'Nhân viên' },
      { id: 3, name: 'Lê Văn C', phone: '0369852147', role: 'Nhân viên' },
      { id: 4, name: 'Phạm Thị D', phone: '0912345678', role: 'Quản lý' },
      { id: 5, name: 'Hoàng Văn E', phone: '0908765432', role: 'Nhân viên' },
      { id: 6, name: 'Ngô Thị F', phone: '0357951246', role: 'Nhân viên' },
      { id: 7, name: 'Đỗ Văn G', phone: '0846215379', role: 'Nhân viên' },
    ];
    setEmployees(sampleEmployees);
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Handle adding a new employee
  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      id: Math.max(0, ...employees.map(e => e.id)) + 1,
      ...employeeData
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
  };

  // Handle updating an employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setShowEditModal(false);
  };

  // Handle deleting an employee
  const handleDeleteEmployee = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div>
      {/* Search and action area */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
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

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors font-medium"
        >
          Thêm nhân viên
        </button>
      </div>

      {/* Employee table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-300 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm font-medium text-gray-900">#{employee.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{employee.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{employee.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentEmployee(employee);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 mr-2 transition-colors font-medium"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
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
            Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> trong tổng số <span className="font-medium">{filteredEmployees.length}</span> mục
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

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee}
        />
      )}

      {/* Edit Employee Modal */}
      {showEditModal && currentEmployee && (
        <EditEmployeeModal
          employee={currentEmployee}
          onClose={() => {
            setShowEditModal(false);
            setCurrentEmployee(null);
          }}
          onSave={handleUpdateEmployee}
        />
      )}
    </div>
  );
};

// Add Employee Modal Component
 const AddEmployeeModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onSave({
        name: name.trim(),
        phone: phone.trim(),
        role: 'Nhân viên' // Default role
      });
      setName('');
      setPhone('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/3 max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm nhân viên mới</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="tel"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
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
              Thêm nhân viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Employee Modal Component
const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [name, setName] = useState(employee?.name || '');
  const [phone, setPhone] = useState(employee?.phone || '');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onSave({
        ...employee,
        name: name.trim(),
        phone: phone.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-1/3 max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa nhân viên</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="tel"
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
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

// Permission Management Component
const PermissionManagement = () => {
  const roles = [
    { id: 'employee', name: 'Nhân viên' },
    { id: 'manager', name: 'Quản lý' },
    { id: 'admin', name: 'Quản trị viên' }
  ];

  const permissions = [
    { id: 'view_products', name: 'Xem sản phẩm' },
    { id: 'add_products', name: 'Thêm sản phẩm' },
    { id: 'edit_products', name: 'Sửa sản phẩm' },
    { id: 'delete_products', name: 'Xóa sản phẩm' },
    { id: 'view_orders', name: 'Xem đơn hàng' },
    { id: 'add_orders', name: 'Tạo đơn hàng' },
    { id: 'edit_orders', name: 'Sửa đơn hàng' },
    { id: 'view_inventory', name: 'Xem hàng tồn kho' },
    { id: 'manage_inventory', name: 'Quản lý hàng tồn kho' },
    { id: 'view_employees', name: 'Xem danh sách nhân viên' },
    { id: 'manage_employees', name: 'Quản lý nhân viên' },
    { id: 'view_reports', name: 'Xem báo cáo' },
  ];

  // Sample permissions data based on roles
  const [rolePermissions, setRolePermissions] = useState({
    employee: [
      'view_products', 'add_orders', 'view_orders', 'view_inventory'
    ],
    manager: [
      'view_products', 'add_products', 'edit_products', 'view_orders', 
      'add_orders', 'edit_orders', 'view_inventory', 'manage_inventory', 
      'view_employees', 'view_reports'
    ],
    admin: [
      'view_products', 'add_products', 'edit_products', 'delete_products',
      'view_orders', 'add_orders', 'edit_orders', 'view_inventory',
      'manage_inventory', 'view_employees', 'manage_employees', 'view_reports'
    ]
  });

  const togglePermission = (roleId, permissionId) => {
    setRolePermissions(prev => {
      const currentRolePermissions = [...prev[roleId]];
      const permissionIndex = currentRolePermissions.indexOf(permissionId);
      
      if (permissionIndex > -1) {
        currentRolePermissions.splice(permissionIndex, 1);
      } else {
        currentRolePermissions.push(permissionId);
      }
      
      return {
        ...prev,
        [roleId]: currentRolePermissions
      };
    });
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Quyền
              </th>
              {roles.map(role => (
                <th key={role.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {permissions.map(permission => (
              <tr key={permission.id} className="border-b border-gray-300 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                  <div className="text-sm text-gray-900">{permission.name}</div>
                </td>
                {roles.map(role => (
                  <td key={`${role.id}-${permission.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={rolePermissions[role.id].includes(permission.id)}
                      onChange={() => togglePermission(role.id, permission.id)}
                      className="h-5 w-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 checked:bg-blue-600 checked:border-blue-600"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-700 hover:bg-blue-700 font-medium"
          onClick={() => alert('Phân quyền đã được cập nhật!')}
        >
          Lưu phân quyền
        </button>
      </div>
    </div>
  );
};

export default EmployeeManagement;