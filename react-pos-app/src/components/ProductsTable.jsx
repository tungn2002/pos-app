const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    sku: 'IP15PM-256',
    category: 'Điện thoại',
    price: '32,500,000đ',
    stock: 45,
    status: 'Đang bán',
    statusColor: 'green',
    icon: 'fa-mobile-screen-button',
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    sku: 'MBPM3-14',
    category: 'Laptop',
    price: '45,900,000đ',
    stock: 12,
    status: 'Đang bán',
    statusColor: 'green',
    icon: 'fa-laptop-code',
  },
  {
    id: 3,
    name: 'AirPods Pro Gen 2',
    sku: 'APPG2-W',
    category: 'Phụ kiện',
    price: '5,400,000đ',
    stock: 0,
    status: 'Hết hàng',
    statusColor: 'red',
    icon: 'fa-headphones-simple',
  },
];

function ProductRow({ product }) {
  return (
    <tr className="hover:bg-blue-50/30 transition-colors">
      <td className="px-6 py-5">
        <input type="checkbox" className="w-4 h-4 border-slate-300 rounded" />
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-lg">
            <i className={`fa-solid ${product.icon}`}></i>
          </div>
          <div>
            <p className="font-bold text-slate-900">{product.name}</p>
            <p className="text-[10px] font-black text-blue-500 uppercase">SKU: {product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm font-semibold text-slate-600">{product.category}</td>
      <td className="px-6 py-5 font-bold text-slate-900">{product.price}</td>
      <td className="px-6 py-5 text-center font-bold text-slate-700">{product.stock}</td>
      <td className="px-6 py-5">
        <span
          className={`px-2.5 py-1 text-[10px] uppercase font-black rounded-md border ${
            product.statusColor === 'green'
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-red-100 text-red-700 border-red-200'
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-3 text-slate-400">
          <button className="p-2 rounded-md border border-slate-200 hover:border-blue-500 hover:text-blue-600 bg-white transition-all shadow-sm">
            <i className="fa-solid fa-pen"></i>
          </button>
          <button className="p-2 rounded-md border border-slate-200 hover:border-red-500 hover:text-red-600 bg-white transition-all shadow-sm">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export function ProductsTable() {
  return (
    <div className="card-classic overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-classic">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-[11px] uppercase font-black tracking-widest">
              <th className="px-6 py-5 w-12">
                <input type="checkbox" className="w-4 h-4 border-slate-300 rounded focus:ring-blue-500" />
              </th>
              <th className="px-6 py-5">Sản phẩm & Mã SKU</th>
              <th className="px-6 py-5">Danh mục</th>
              <th className="px-6 py-5">Giá niêm yết</th>
              <th className="px-6 py-5 text-center">Tồn kho</th>
              <th className="px-6 py-5">Trạng thái</th>
              <th className="px-6 py-5 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {PRODUCTS.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-6 border-t border-slate-200 flex items-center justify-between bg-slate-50">
        <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-sm">
          Trước
        </button>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/30">
            1
          </button>
          <button className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all">
            2
          </button>
          <button className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all">
            3
          </button>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-sm">
          Kế tiếp
        </button>
      </div>
    </div>
  );
}
