import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_USER, MOCK_ORDERS } from '../../constants';
import OrderRow from './Orderrow';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-fadeIn max-w-7xl mx-auto px-4 md:px-0">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
          <h1 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            Welcome back, {MOCK_USER.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 text-lg max-w-xl font-normal leading-relaxed">
            Manage your profile, track your premium marble shipments, and view your curated order history.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-end gap-3">
          <button className="w-full md:w-auto max-w-xs flex items-center justify-center gap-2 px-3 md:px-5 py-2.5 rounded-xl border border-border-soft text-slate-700 bg-white font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-soft custom-shadow">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8">
          
          {/* Avatar and Info */}
          <div className="flex gap-4 md:gap-6 items-center flex-1">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 ring-1 ring-slate-100" 
              style={{ backgroundImage: `url("${MOCK_USER.avatar}")` }}
            />
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left min-w-0">
              <h2 className="text-slate-900 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight truncate">{MOCK_USER.name}</h2>
              <div className="flex flex-col md:flex-row md:items-center text-slate-500 text-sm gap-2 md:gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                  <span className="font-medium truncate">{MOCK_USER.email}</span>
                </div>
                <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>
                  <span className="font-medium">Member since {MOCK_USER.membershipDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="w-full md:w-auto mx-auto md:mx-0 bg-primary hover:bg-slate-800 text-white font-bold py-3 px-4 md:py-4 md:px-10 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 mt-4 md:mt-0">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { icon: 'local_shipping', label: 'Active Shipments', value: '02', color: 'text-slate-900' },
          { icon: 'shopping_bag', label: 'Total Orders', value: '14', color: 'text-slate-900' },
          { icon: 'workspace_premium', label: 'Reward Points', value: '4,250', color: 'text-accent-green' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-7 rounded-2xl border border-border-soft flex flex-col gap-4 items-center md:items-start text-center md:text-left custom-shadow hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
              <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-slate-900 text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-slate-900 text-xl font-bold font-display">Recent Orders</h2>
          <button className="text-slate-900 text-sm font-bold hover:text-accent-green transition-colors flex items-center gap-1">
            View All Orders <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.1em] text-left">
                <th className="px-8 py-2">Order ID</th>
                <th className="px-8 py-2">Products</th>
                <th className="px-8 py-2">Date</th>
                <th className="px-8 py-2">Amount</th>
                <th className="px-8 py-2 text-center">Status</th>
                <th className="px-8 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.slice(0, 3).map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4 pb-4">
          {MOCK_ORDERS.slice(0, 3).map((order) => (
            <div key={order.id} className="bg-white border border-border-soft rounded-2xl p-4 flex items-start justify-between gap-4 min-w-0">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex -space-x-2 flex-shrink-0">
                  {order.products.slice(0, 3).map((p) => (
                    <div key={p.id} className="h-10 w-10 rounded-lg border bg-cover bg-center" style={{ backgroundImage: `url('${p.image}')` }} />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{order.id}</p>
                  <p className="text-xs text-slate-500 truncate">{order.date} • ${order.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wide ${
                  order.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                  order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  'bg-slate-50 text-slate-700 border-slate-100'
                }`}>{order.status}</span>
                <Link to={`/track/${order.id.replace('#', '')}`} className="text-slate-300 hover:text-primary">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="relative bg-slate-900 rounded-2xl p-6 md:p-10 overflow-hidden shadow-2xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 100 L100 0 L100 100 Z" fill="white"></path>
          </svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-10">
          <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
            <h3 className="text-white text-3xl font-bold font-display">Exclusive Anniversary Offer</h3>
            <p className="text-slate-400 text-lg max-w-full sm:max-w-md font-medium">As a premium member for 1 year, enjoy 15% off on our new "Calacatta Gold" collection.</p>
          </div>
          <button className="mx-auto md:mx-0 bg-white text-slate-900 font-extrabold py-3 px-6 md:py-4 md:px-10 rounded-2xl hover:bg-accent-green hover:text-white transition-all whitespace-nowrap">
            Redeem Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
