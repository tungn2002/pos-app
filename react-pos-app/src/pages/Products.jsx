import { ProductsTable } from '../components';

export function Products() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Kho hàng</h1>
          <p className="text-slate-600 font-medium">Cập nhật và theo dõi tồn kho sản phẩm.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center">
          <i className="fa-solid fa-plus-circle mr-2"></i> Thêm mới
        </button>
      </div>

      {/* Filters */}
      <div className="card-classic p-4 mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="bg-white border border-slate-300 text-sm font-semibold rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10 cursor-pointer">
              <option>Mọi danh mục</option>
              <option>Điện thoại</option>
              <option>Laptop</option>
              <option>Phụ kiện</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
          <div className="relative">
            <select className="bg-white border border-slate-300 text-sm font-semibold rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10 cursor-pointer">
              <option>Trạng thái: Tất cả</option>
              <option>Đang bán</option>
              <option>Hết hàng</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-[10px] text-slate-400 pointer-events-none"></i>
          </div>
        </div>
        <div className="text-slate-600 text-sm font-bold">
          Tổng số: <span className="text-blue-600">150</span> mã hàng
        </div>
      </div>

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
