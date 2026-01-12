const CATEGORIES = [
  { id: 1, name: 'Điện thoại', icon: 'fa-mobile-screen-button', color: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Laptop', icon: 'fa-laptop-code', color: 'bg-purple-100 text-purple-700' },
  { id: 3, name: 'Phụ kiện', icon: 'fa-headphones-simple', color: 'bg-orange-100 text-orange-700' },
  { id: 4, name: 'Tablet', icon: 'fa-tablet-screen-button', color: 'bg-green-100 text-green-700' },
  { id: 5, name: 'Smartwatch', icon: 'fa-clock', color: 'bg-red-100 text-red-700' },
  { id: 6, name: 'Tất cả', icon: 'fa-border-all', color: 'bg-slate-100 text-slate-700' },
];

export function CategoryList({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex-shrink-0 bg-white border-r border-slate-300 overflow-y-auto flex flex-col gap-3 p-4" style={{ width: '180px' }}>
      <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wide">Danh mục</h3>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              selectedCategory === category.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${category.color}`}>
              <i className={`fa-solid ${category.icon}`}></i>
            </div>
            <p className="text-xs font-semibold text-slate-700 text-center truncate w-full">
              {category.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
