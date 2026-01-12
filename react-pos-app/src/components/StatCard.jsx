export function StatCard({ icon, label, value, change, isPositive = true }) {
  return (
    <div className="card-classic p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border ${icon.bgColor} ${icon.textColor}`}>
          <i className={`${icon.icon} text-xl`}></i>
        </div>
        <span
          className={`text-xs font-black px-2 py-0.5 rounded border ${
            isPositive
              ? 'text-green-600 bg-green-100 border-green-200'
              : 'text-red-600 bg-red-100 border-red-200'
          }`}
        >
          {isPositive ? '+' : ''}{change}
        </span>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );
}
