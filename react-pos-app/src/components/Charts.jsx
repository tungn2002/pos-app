import { useEffect } from 'react';

export function GrowthChart() {
  useEffect(() => {
    // Chart.js được load từ CDN global
    if (window.Chart) {
      const ctxGrowth = document.getElementById('growthChart');
      if (ctxGrowth && !ctxGrowth.chart) {
        ctxGrowth.chart = new Chart(ctxGrowth.getContext('2d'), {
          type: 'line',
          data: {
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
            datasets: [
              {
                label: 'Doanh thu (triệu)',
                data: [12, 19, 15, 25, 22, 30, 28],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
                borderWidth: 4,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#2563eb',
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#e2e8f0', borderDash: [3, 3] },
                ticks: { font: { weight: 'bold' } },
              },
              x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="lg:col-span-2 card-classic p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-slate-800 uppercase tracking-tight">Phân tích tăng trưởng</h3>
        <i className="fa-solid fa-ellipsis-vertical text-slate-400"></i>
      </div>
      <div className="h-[320px]">
        <canvas id="growthChart"></canvas>
      </div>
    </div>
  );
}

export function CategoryChart() {
  useEffect(() => {
    if (window.Chart) {
      const ctxCategory = document.getElementById('categoryChart');
      if (ctxCategory && !ctxCategory.chart) {
        ctxCategory.chart = new Chart(ctxCategory.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Điện thoại', 'Laptop', 'Phụ kiện', 'Khác'],
            datasets: [
              {
                data: [45, 25, 20, 10],
                backgroundColor: ['#2563eb', '#9333ea', '#ea580c', '#059669'],
                borderColor: '#ffffff',
                borderWidth: 4,
                cutout: '65%',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { usePointStyle: true, padding: 25, font: { size: 11, weight: 'bold' } },
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="card-classic p-6">
      <h3 className="font-black text-slate-800 uppercase tracking-tight mb-6">Tỷ lệ danh mục</h3>
      <div className="h-[320px] flex items-center justify-center">
        <canvas id="categoryChart"></canvas>
      </div>
    </div>
  );
}
