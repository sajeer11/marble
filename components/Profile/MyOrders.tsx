
'use client';

import React, { useState } from 'react';
import { MOCK_USER, MOCK_ORDERS } from '../../constants';

import OrderRow from './Orderrow';

const MyOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const filteredOrders = activeTab === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      <div className="flex flex-col gap-2">
        <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">My Orders</h1>
        <p className="text-slate-500 text-base font-normal">Manage and track your premium marble acquisitions and custom installations.</p>
      </div>

      <div className="border-b border-slate-200 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8">
          {['All', 'Ongoing', 'Completed', 'Cancelled'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 px-1 whitespace-nowrap transition-colors
                ${activeTab === tab ? 'border-brand-blue text-slate-900' : 'border-transparent text-slate-500 hover:text-brand-blue'}
              `}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab} Orders</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border-soft overflow-hidden custom-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-8 py-4 text-slate-800 text-xs font-bold uppercase tracking-wider">Order ID</th>
                <th className="px-8 py-4 text-slate-800 text-xs font-bold uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-slate-800 text-xs font-bold uppercase tracking-wider">Product Summary</th>
                <th className="px-8 py-4 text-slate-800 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-slate-800 text-xs font-bold uppercase tracking-wider">Total</th>
                <th className="px-8 py-4 text-slate-500 text-xs font-bold text-right uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6 text-slate-900 text-sm font-bold">{order.id}</td>
                    <td className="px-8 py-6 text-slate-500 text-sm">{order.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 p-0.5">
                          <img src={order.products[0].image} alt="" className="w-full h-full object-cover rounded shadow-inner" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium">{order.summary}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset
                        ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 ring-emerald-700/10' : 
                          order.status === 'In Transit' ? 'bg-amber-50 text-amber-700 ring-amber-700/10' :
                          'bg-blue-50 text-blue-700 ring-blue-700/10'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-900 text-sm font-bold">${order.amount.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-brand-blue hover:text-blue-800 text-sm font-bold transition-colors">Details</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400">
                    No orders found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing {filteredOrders.length} of {MOCK_ORDERS.length} orders</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed" disabled>Previous</button>
            <button className="px-4 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors">Next</button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-8 rounded-3xl bg-blue-50/50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="size-14 rounded-full bg-brand-blue flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-blue/20">
            <span className="material-symbols-outlined text-3xl">support_agent</span>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold text-xl">Need help with an order?</h4>
            <p className="text-slate-600 text-base">Our concierge service is available 24/7 for our premium members.</p>
          </div>
        </div>
        <button className="whitespace-nowrap bg-brand-blue text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-blue-800 transition-colors shadow-xl shadow-brand-blue/20">
          Contact Concierge
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
