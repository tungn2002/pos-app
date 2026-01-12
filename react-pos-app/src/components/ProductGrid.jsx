import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 32500000, stock: 45, category: 1, icon: 'fa-mobile-screen-button' },
  { id: 2, name: 'iPhone 15 Pro', price: 28500000, stock: 32, category: 1, icon: 'fa-mobile-screen-button' },
  { id: 3, name: 'Samsung Galaxy S24', price: 24900000, stock: 28, category: 1, icon: 'fa-mobile-screen-button' },
  { id: 4, name: 'MacBook Pro M3', price: 45900000, stock: 12, category: 2, icon: 'fa-laptop-code' },
  { id: 5, name: 'MacBook Air M2', price: 32500000, stock: 18, category: 2, icon: 'fa-laptop-code' },
  { id: 6, name: 'Dell XPS 15', price: 38500000, stock: 15, category: 2, icon: 'fa-laptop-code' },
  { id: 7, name: 'AirPods Pro Gen 2', price: 5400000, stock: 0, category: 3, icon: 'fa-headphones-simple' },
  { id: 8, name: 'Apple Watch Series 9', price: 12500000, stock: 25, category: 5, icon: 'fa-clock' },
];

export function ProductGrid({ selectedCategory, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchCategory = selectedCategory === 6 || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 gap-3 overflow-hidden min-w-0 p-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm outline-none transition-all"
          placeholder="Tìm kiếm sản phẩm..."
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-white rounded-lg border border-slate-200 hover:border-blue-500 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="w-full h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-3xl">
                <i className={`fa-solid ${product.icon}`}></i>
              </div>
              <div className="p-3">
                <p className="font-semibold text-slate-900 text-sm line-clamp-2">{product.name}</p>
                <p className="text-blue-600 font-bold text-sm mt-1">{formatPrice(product.price)}</p>
                <p className={`text-xs mt-1 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `Tồn: ${product.stock}` : 'Hết hàng'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
