export function Sidebar({ activePage, onNavigate, isOpen }) {
  return (
    <aside 
      className={`bg-slate-900 flex-shrink-0 flex flex-col border-r border-slate-700 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`} 
      style={{ color: '#c7c7c7' }}
    >
      <div className={`p-6 flex items-center ${isOpen ? 'gap-3' : 'justify-center'} border-b border-slate-800`}>
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
          A
        </div>
        {isOpen && <span className="text-xl font-bold text-white tracking-tight">CLASSIC ADMIN</span>}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {isOpen && (
          <p className="text-[10px] uppercase text-slate-500 font-bold px-2 mb-2 tracking-widest">
            Chính
          </p>
        )}
        <button
          onClick={() => onNavigate('pos')}
          className={`sidebar-item ${
            activePage === 'pos' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'POS' : ''}
        >
          <i className="fa-solid fa-cash-register w-6"></i>
          {isOpen && <span className="font-medium">POS</span>}
        </button>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`sidebar-item ${
            activePage === 'dashboard' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Bảng điều khiển' : ''}
        >
          <i className="fa-solid fa-gauge-high w-6"></i>
          {isOpen && <span className="font-medium">Bảng điều khiển</span>}
        </button>
        <button
          onClick={() => onNavigate('revenue')}
          className={`sidebar-item ${
            activePage === 'revenue' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Báo cáo doanh thu' : ''}
        >
          <i className="fa-solid fa-chart-line w-6"></i>
          {isOpen && <span className="font-medium">Báo cáo doanh thu</span>}
        </button>

        {isOpen && (
          <p className="text-[10px] uppercase text-slate-500 font-bold px-2 mt-6 mb-2 tracking-widest">
            Quản lý
          </p>
        )}
        <button
          onClick={() => onNavigate('users')}
          className={`sidebar-item ${
            activePage === 'users' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Người dùng' : ''}
        >
          <i className="fa-solid fa-users w-6"></i>
          {isOpen && <span className="font-medium">Người dùng</span>}
        </button>
        <button
          onClick={() => onNavigate('products')}
          className={`sidebar-item ${
            activePage === 'products' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Sản phẩm' : ''}
        >
          <i className="fa-solid fa-box w-6"></i>
          {isOpen && <span className="font-medium">Sản phẩm</span>}
        </button>
        <button
          onClick={() => onNavigate('orders')}
          className={`sidebar-item ${
            activePage === 'orders' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Đơn hàng' : ''}
        >
          <i className="fa-solid fa-cart-shopping w-6"></i>
          {isOpen && <span className="font-medium">Đơn hàng</span>}
        </button>

        {isOpen && (
          <p className="text-[10px] uppercase text-slate-500 font-bold px-2 mt-6 mb-2 tracking-widest">
            Hệ thống
          </p>
        )}
        <button
          onClick={() => onNavigate('settings')}
          className={`sidebar-item ${
            activePage === 'settings' ? 'active text-white' : ''
          }`}
          title={!isOpen ? 'Cài đặt' : ''}
        >
          <i className="fa-solid fa-gear w-6"></i>
          {isOpen && <span className="font-medium">Cài đặt</span>}
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'} p-2 bg-slate-800 rounded-lg border border-slate-700`}>
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-slate-600"
          />
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                Quản trị viên
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
