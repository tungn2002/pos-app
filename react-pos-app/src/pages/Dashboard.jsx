import { StatCard, GrowthChart, CategoryChart } from '../components';

export function Dashboard() {
  const statsData = [
    {
      icon: { icon: 'fa-solid fa-wallet', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
      label: 'Doanh thu tháng',
      value: '128.4M',
      change: '12.5%',
      isPositive: true,
    },
    {
      icon: { icon: 'fa-solid fa-cart-flatbed', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
      label: 'Đơn hàng mới',
      value: '1,240',
      change: '8.2%',
      isPositive: true,
    },
    {
      icon: { icon: 'fa-solid fa-user-plus', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      label: 'Khách hàng',
      value: '452',
      change: '2.4%',
      isPositive: false,
    },
    {
      icon: { icon: 'fa-solid fa-bolt', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
      label: 'Lượt truy cập',
      value: '12.9K',
      change: '24%',
      isPositive: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-slate-600 font-medium">Báo cáo hiệu suất hoạt động thời gian thực.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center">
          <i className="fa-solid fa-file-export mr-2"></i> Xuất dữ liệu
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GrowthChart />
        <CategoryChart />
      </div>
    </div>
  );
}
