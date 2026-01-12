export function Navbar({ onMenuToggle }) {
  return (
    <header className="h-16 bg-white border-b border-slate-300 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="text-slate-600 hover:text-slate-900 transition-colors"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="bg-slate-100 border border-slate-300 rounded-md py-1.5 pl-10 pr-4 w-72 focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm outline-none transition-all"
            placeholder="Tìm kiếm hệ thống..."
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-blue-600 transition-colors">
          <i className="fa-solid fa-bell text-lg"></i>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
            3
          </span>
        </button>
        <div className="h-8 w-px bg-slate-300"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Quản trị viên</p>
            <p className="text-[10px] text-green-600 font-bold uppercase">Trực tuyến</p>
          </div>
          <i className="fa-solid fa-circle-user text-2xl text-slate-400 group-hover:text-blue-600 transition-colors"></i>
        </div>
      </div>
    </header>
  );
}
