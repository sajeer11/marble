'use client';

import React from 'react';
import { PRODUCTS, MOCK_ORDERS } from '@/constants';

export default function AdminDashboard() {
  const totalProducts = PRODUCTS.length;
  const totalOrders = MOCK_ORDERS.length;
  const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.amount, 0);
  const deliveredOrders = MOCK_ORDERS.filter(o => o.status === 'Delivered').length;

  const statCards = [
    { icon: 'shopping_bag', label: 'Total Products', value: totalProducts, color: 'blue' },
    { icon: 'shopping_cart', label: 'Total Orders', value: totalOrders, color: 'green' },
    { icon: 'attach_money', label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'yellow' },
    { icon: 'check_circle', label: 'Delivered', value: deliveredOrders, color: 'purple' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const colors: any = {
            blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
            yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
            purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
          };
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-lg ${colors[card.color]}`}>
                  <span className="material-icons text-3xl">{card.icon}</span>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons">history</span>
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.products.length} items</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons">trending_up</span>
            Top Products
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.originalPrice ? (
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Edit</button>
                    <button className="text-red-600 dark:text-red-400 hover:underline font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
