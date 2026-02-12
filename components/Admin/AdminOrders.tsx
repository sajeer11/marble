'use client';

import React, { useEffect, useState } from 'react';

interface Order {
  id: number;
  customerName: string;
  email: string;
  phone?: string | null;
  status: string;
  totalAmount: number;
  items?: any;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const loadOrders = async (status?: string) => {
    setLoading(true);
    try {
      const url = status && status !== 'All' ? `/api/orders?status=${encodeURIComponent(status)}` : '/api/orders';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadOrders(filter);
  }, [filter]);

  const filteredOrders = orders;

  const updateOrderStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map(o => o.id === id ? updated : o));
      }
    } catch {}
  };

  const statusOptions = ['pending', 'Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'];

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
        {['pending', 'Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'].map((status) => {
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Update Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${Number(order.totalAmount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      order.status === 'pending' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' :
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

      {/* Empty/Loading States */}
      {loading && (
        <div className="p-6 text-gray-600 dark:text-gray-400">Loading orders...</div>
      )}
      {!loading && filteredOrders.length === 0 && (
        <div className="p-6 text-gray-600 dark:text-gray-400">No orders found.</div>
      )}
    </div>
  );
}
