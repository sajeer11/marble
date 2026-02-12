'use client';
import React, { useEffect, useMemo, useState } from 'react';

export default function AdminAnalytics() {
  const [orders, setOrders] = useState<Array<{ id: number; totalAmount: number; status: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data || []);
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0),
    [orders]
  );
  const avgOrderValue = useMemo(
    () => (orders.length ? totalRevenue / orders.length : 0),
    [orders, totalRevenue]
  );
  const deliveredOrders = useMemo(
    () => orders.filter(o => o.status === 'Delivered').length,
    [orders]
  );
  const processingOrders = useMemo(
    () => orders.filter(o => o.status === 'Processing').length,
    [orders]
  );
  const successRate = useMemo(
    () => (orders.length ? (deliveredOrders / orders.length) * 100 : 0),
    [orders, deliveredOrders]
  );

  const monthKey = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };
  const monthLabel = (key: string) => {
    const [y, m] = key.split('-').map(Number);
    const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${names[m - 1]} ${String(y).slice(-2)}`;
  };
  const lastNMonths = (n: number) => {
    const now = new Date();
    const arr: string[] = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    return arr;
  };
  const revenueByMonthMap = useMemo(() => {
    const map = new Map<string, number>();
    orders.forEach(o => {
      const key = monthKey(o.createdAt);
      map.set(key, (map.get(key) || 0) + Number(o.totalAmount || 0));
    });
    return map;
  }, [orders]);
  const revenueMonths = useMemo(() => lastNMonths(5), []);
  const revenueData = useMemo(
    () => revenueMonths.map(key => ({ month: monthLabel(key), revenue: revenueByMonthMap.get(key) || 0 })),
    [revenueMonths, revenueByMonthMap]
  );
  const maxRevenue = useMemo(
    () => Math.max(1, ...revenueData.map(d => d.revenue)),
    [revenueData]
  );

  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });
    const total = orders.length || 1;
    const colors: Record<string, string> = {
      Delivered: 'bg-green-500',
      Processing: 'bg-yellow-500',
      'In Transit': 'bg-blue-500',
      Shipped: 'bg-indigo-500',
      pending: 'bg-gray-500',
    };
    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
      percent: ((count / total) * 100).toFixed(0),
      color: colors[status] || 'bg-gray-500',
    }));
  }, [orders]);

  const weekdayName = (d: Date) => ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  const topDays = useMemo(() => {
    const map = new Map<string, { orders: number; revenue: number }>();
    orders.forEach(o => {
      const day = weekdayName(new Date(o.createdAt));
      const entry = map.get(day) || { orders: 0, revenue: 0 };
      entry.orders += 1;
      entry.revenue += Number(o.totalAmount || 0);
      map.set(day, entry);
    });
    return Array.from(map.entries())
      .map(([day, v]) => ({ day, orders: v.orders, revenue: v.revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders]);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Detailed insights into your store performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">+12% from last month</p>
            </div>
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <span className="material-icons text-3xl">trending_up</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${avgOrderValue.toFixed(2)}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">+8% from last month</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <span className="material-icons text-3xl">shopping_cart</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Orders Delivered</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{deliveredOrders}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Success Rate: {successRate.toFixed(0)}%</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <span className="material-icons text-3xl">check_circle</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Processing Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{processingOrders}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Need Attention</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              <span className="material-icons text-3xl">pending_actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue Trend (Last 5 Months)</h2>
        <div className="space-y-4">
          {revenueData.map((data, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="w-12 font-semibold text-gray-700 dark:text-gray-300 text-sm">{data.month}</span>
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-end pr-4 text-white font-bold text-sm"
                  style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                >
                  ${data.revenue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Status Distribution</h2>
          <div className="space-y-4">
            {statusDistribution.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item.status}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{item.count} ({item.percent}%)</span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Performing Days</h2>
          <div className="space-y-3">
            {topDays.map((day, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{day.day}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{day.orders} orders</p>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">${day.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
     
    </div>
  );
}
