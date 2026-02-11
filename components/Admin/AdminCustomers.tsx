'use client';

import React, { useState } from 'react';
import { MOCK_USER, MOCK_ORDERS } from '@/constants';

export default function AdminCustomers() {
  const [customers] = useState([
    {
      id: '1',
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      joinDate: MOCK_USER.membershipDate,
      membershipType: MOCK_USER.membershipType,
      totalOrders: MOCK_ORDERS.length,
      totalSpent: MOCK_ORDERS.reduce((s, o) => s + o.amount, 0),
      status: 'Active',
      avatar: MOCK_USER.avatar,
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@example.com',
      joinDate: 'Aug 2023',
      membershipType: 'Gold Member',
      totalOrders: 8,
      totalSpent: 6250.00,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      joinDate: 'May 2023',
      membershipType: 'Silver Member',
      totalOrders: 5,
      totalSpent: 3800.00,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    },
  ]);

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
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
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
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
