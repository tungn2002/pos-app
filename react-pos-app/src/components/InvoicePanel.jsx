const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

function InvoiceItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div>
        <p className="font-semibold text-slate-900 text-sm truncate">{item.name}</p>
        <p className="text-blue-600 font-bold text-xs mt-1">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 border border-slate-300 rounded-lg flex-shrink-0">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <i className="fa-solid fa-minus text-xs"></i>
          </button>
          <span className="w-6 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </div>
        <p className="font-bold text-slate-900 text-sm flex-1 text-right min-w-0">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
        >
          <i className="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    </div>
  );
}

export function InvoicePanel({ items, onUpdateQuantity, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="flex-shrink-0 bg-white border-l border-slate-300 flex flex-col overflow-hidden" style={{ width: 'auto', minWidth: '420px', maxWidth: '500px' }}>
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wide">Hóa đơn</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <i className="fa-solid fa-cart-shopping text-4xl mb-2"></i>
              <p className="text-sm">Chưa có sản phẩm</p>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <InvoiceItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      <div className="border-t border-slate-200 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Tạm tính:</span>
          <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Thuế (10%):</span>
          <span className="font-semibold text-slate-900">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
          <span className="text-slate-900">Tổng cộng:</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="p-4 space-y-2 border-t border-slate-200">
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold py-2 rounded-lg transition-all"
        >
          <i className="fa-solid fa-check mr-2"></i>
          Thanh toán
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all">
          <i className="fa-solid fa-print mr-2"></i>
          In hóa đơn
        </button>
      </div>
    </div>
  );
}
