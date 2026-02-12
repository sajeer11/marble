'use client';

import React, { useEffect, useMemo, useState } from 'react';

export default function AdminCustomers() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const customers = useMemo(() => {
    const map = new Map<string, any>();
    orders.forEach(o => {
      const email = o.email;
      if (!email) return;
      const entry = map.get(email) || {
        id: email,
        name: o.customerName || email.split('@')[0],
        email,
        joinDate: new Date(o.createdAt).toLocaleDateString(),
        membershipType: 'Member',
        totalOrders: 0,
        totalSpent: 0,
        status: 'Active',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      };
      entry.totalOrders += 1;
      entry.totalSpent += Number(o.totalAmount || 0);
      if (!entry.firstOrderAt || new Date(o.createdAt) < new Date(entry.firstOrderAt)) {
        entry.firstOrderAt = o.createdAt;
        entry.joinDate = new Date(o.createdAt).toLocaleDateString();
      }
      map.set(email, entry);
    });
    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const openCustomer = async (email: string) => {
    setSelectedEmail(email);
    try {
      const res = await fetch(`/api/checkout?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setCustomerOrders(data);
      } else {
        setCustomerOrders([]);
      }
    } catch {
      setCustomerOrders([]);
    }
  };
  const closeCustomer = () => {
    setSelectedEmail(null);
    setCustomerOrders([]);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Customers Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and view customer information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <span className="material-icons text-3xl">people</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <span className="material-icons text-3xl">check_circle</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{customers.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <span className="material-icons text-3xl">trending_up</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue (Customers)</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${customers.reduce((s, c) => s + c.totalSpent, 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Join Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Membership</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Total Spent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                    <img src={customer.avatar} alt={customer.name} className="w-8 h-8 rounded-full object-cover" />
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{customer.joinDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded text-xs font-semibold">
                      {customer.membershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'Active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button onClick={() => openCustomer(customer.email)} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                      <span className="material-icons text-sm">visibility</span>
                      View
                    </button>
                    <button className="text-orange-600 dark:text-orange-400 hover:underline font-semibold flex items-center gap-1">
                      <span className="material-icons text-sm">edit</span>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profiles Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customers.sort((a, b) => b.totalSpent - a.totalSpent).map((customer) => (
            <div key={customer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-24 bg-gradient-to-r from-yellow-600 to-yellow-700"></div>
              <div className="relative px-6 pb-6">
                <div className="-mt-12 mb-4">
                  <img src={customer.avatar} alt={customer.name} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{customer.email}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="text-gray-600 dark:text-gray-400">Orders:</span> <span className="font-semibold text-gray-900 dark:text-white">{customer.totalOrders}</span></p>
                  <p className="text-sm"><span className="text-gray-600 dark:text-gray-400">Total Spent:</span> <span className="font-semibold text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</span></p>
                </div>
                <button onClick={() => openCustomer(customer.email)} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer: Customer Orders */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={closeCustomer}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[540px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Orders</h3>
              <button onClick={closeCustomer} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <span className="material-icons">close</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{selectedEmail}</p>
            {loading ? (
              <div className="py-10 text-center text-gray-500">Loading...</div>
            ) : customerOrders.length === 0 ? (
              <div className="py-10 text-center text-gray-500">No orders found for this customer.</div>
            ) : (
              <div className="space-y-4">
                {customerOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500">Order</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">#{order.id}</span>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'In Transit' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{order.status}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        ${Number(order.totalAmount || 0).toLocaleString()}
                      </div>
                      <a href={`/track/${order.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                        <span className="material-icons text-sm">visibility</span>
                        Track
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
