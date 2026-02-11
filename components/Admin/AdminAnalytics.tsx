'use client';

import React from 'react';
import { MOCK_ORDERS } from '@/constants';

export default function AdminAnalytics() {
  const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.amount, 0);
  const avgOrderValue = totalRevenue / MOCK_ORDERS.length;
  const deliveredOrders = MOCK_ORDERS.filter(o => o.status === 'Delivered').length;
  const processingOrders = MOCK_ORDERS.filter(o => o.status === 'Processing').length;

  const revenueData = [
    { month: 'Jun', revenue: 4200 },
    { month: 'Jul', revenue: 5800 },
    { month: 'Aug', revenue: 4800 },
    { month: 'Sep', revenue: 3200 },
    { month: 'Oct', revenue: 6100 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

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
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Success Rate: {(deliveredOrders / MOCK_ORDERS.length * 100).toFixed(0)}%</p>
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
            {[
              { status: 'Delivered', count: deliveredOrders, color: 'bg-green-500', percent: (deliveredOrders / MOCK_ORDERS.length * 100).toFixed(0) },
              { status: 'Processing', count: processingOrders, color: 'bg-yellow-500', percent: (processingOrders / MOCK_ORDERS.length * 100).toFixed(0) },
              { status: 'In Transit', count: MOCK_ORDERS.filter(o => o.status === 'In Transit').length, color: 'bg-blue-500', percent: ((MOCK_ORDERS.filter(o => o.status === 'In Transit').length / MOCK_ORDERS.length) * 100).toFixed(0) },
            ].map((item, idx) => (
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
            {[
              { day: 'Monday', orders: 3, revenue: 8200 },
              { day: 'Tuesday', orders: 2, revenue: 5600 },
              { day: 'Wednesday', orders: 4, revenue: 12400 },
              { day: 'Thursday', orders: 1, revenue: 3200 },
              { day: 'Friday', orders: 2, revenue: 6100 },
            ].map((day, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{day.day}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{day.orders} orders</p>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">${day.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Export Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons text-red-600">picture_as_pdf</span>
              <span className="font-semibold text-gray-900 dark:text-white">Export as PDF</span>
            </div>
            <span className="material-icons text-gray-400">arrow_forward</span>
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons text-green-600">table_chart</span>
              <span className="font-semibold text-gray-900 dark:text-white">Export as CSV</span>
            </div>
            <span className="material-icons text-gray-400">arrow_forward</span>
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons text-blue-600">file_download</span>
              <span className="font-semibold text-gray-900 dark:text-white">Export as Excel</span>
            </div>
            <span className="material-icons text-gray-400">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
