export function POSHeader({ onAdminClick }) {
  return (
    <header className="h-16 bg-white border-b border-slate-300 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
          P
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">POS SYSTEM</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAdminClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
        >
          <i className="fa-solid fa-gear"></i>
          Quản trị
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
