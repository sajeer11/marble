'use client';

import React, { useState } from 'react';
import { MOCK_ORDERS } from '@/constants';

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState<string>('All');

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
  };

  const statusOptions = ['Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all customer orders and track shipments</p>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('All')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            filter === 'All'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
          }`}
        >
          All Orders ({orders.length})
        </button>
        {['Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'].map((status) => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === status
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Items</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Update Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.products.length} items</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                      <span className="material-icons text-sm">visibility</span>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details */}
      {filteredOrders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{order.id}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{order.summary}</p>
              <div className="space-y-2">
                {order.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="material-icons text-sm">check_circle</span>
                    {product.name}
                  </div>
                ))}
              </div>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-all mt-4">
                View Full Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
