'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';
import OrderRow from './Orderrow';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useUserAuth();
  const [profile, setProfile] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews'>('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!isLoggedIn || !user?.email) {
        setLoading(false);
        return;
      }
      try {
        const pid = typeof user.id === 'number' ? user.id : parseInt(String(user.id));
        const pRes = await fetch(`/api/user/profile?userId=${pid}`);
        if (pRes.ok) {
          const pData = await pRes.json();
          setProfile(pData);
        }
      } catch { }
      try {
        const oRes = await fetch(`/api/checkout?email=${encodeURIComponent(user.email)}`);
        if (oRes.ok) {
          const oData = await oRes.json();
          setOrders(oData);
        }
      } catch { }
      try {
        const pid = typeof user.id === 'number' ? user.id : parseInt(String(user.id));
        const rRes = await fetch(`/api/reviews/user?userId=${pid}`);
        if (rRes.ok) {
          const rData = await rRes.json();
          setReviews(rData);
        }
      } catch { }
      setLoading(false);
    };
    load();
  }, [isLoggedIn, user?.email, user?.id]);

  return (
    <div className="flex flex-col gap-10 animate-fadeIn max-w-7xl mx-auto px-4 md:px-0">

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
          <h1 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            Welcome back, {(profile?.firstName || user?.name || '').split(' ')[0]}
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
              style={{ backgroundImage: `url("${profile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarbleLux'}")` }}
            />
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left min-w-0">
              <h2 className="text-slate-900 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight truncate">{profile ? `${profile.firstName} ${profile.lastName}` : (user?.name || '')}</h2>
              <div className="flex flex-col md:flex-row md:items-center text-slate-500 text-sm gap-2 md:gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                  <span className="font-medium truncate">{profile?.email || user?.email}</span>
                </div>
                <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>
                  <span className="font-medium">Member since {profile?.membershipDate || ''}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => router.push('/settings')}
            className="w-full md:w-auto mx-auto md:mx-0 bg-primary hover:bg-slate-800 text-white font-bold py-3 px-4 md:py-4 md:px-10 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 mt-4 md:mt-0">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { icon: 'local_shipping', label: 'Active Shipments', value: String(orders.filter(o => ['Processing', 'Shipped', 'In Transit'].includes(o.status)).length).padStart(2, '0'), color: 'text-slate-900' },
          { icon: 'shopping_bag', label: 'Total Orders', value: String(orders.length).padStart(2, '0'), color: 'text-slate-900' },
          { icon: 'workspace_premium', label: 'Reward Points', value: String(Math.round(orders.reduce((t, o) => t + Number(o.totalAmount || 0), 0) / 10)).replace(/\B(?=(\d{3})+(?!\d))/g, ','), color: 'text-accent-green' },
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

      {/* Tab Switcher */}
      <div className="flex gap-4 border-b border-border-soft px-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'orders' ? 'text-primary' : 'text-slate-400'}`}
        >
          Recent Orders
          {activeTab === 'orders' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'reviews' ? 'text-primary' : 'text-slate-400'}`}
        >
          My Reviews ({reviews.length})
          {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />}
        </button>
      </div>

      {/* Orders View */}
      {activeTab === 'orders' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-slate-900 text-xl font-bold font-display">Recent Orders</h2>
            <button onClick={() => router.push('/orders')} className="text-slate-900 text-sm font-bold hover:text-accent-green transition-colors flex items-center gap-1">
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
                {orders.slice(0, 3).map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="bg-white border border-border-soft rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Order #{order.customId || order.id}</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wide ${order.status === 'In Transit' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                    }`}>{order.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 bg-cover bg-center"
                    style={{ backgroundImage: `url('${(order.items as any[])?.[0]?.image || '/placeholder.png'}')` }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 truncate">{(order.items as any[])?.[0]?.name || 'Multiple Products'}</p>
                    <p className="text-sm text-slate-500">{(order.items as any[])?.length || 0} items</p>
                  </div>
                  <span className="font-bold text-slate-900">${Number(order.totalAmount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <Link href={`/track/${order.id}`} className="text-primary hover:underline flex items-center gap-1">
                    Track Order <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews View */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          {reviews.map(r => (
            <div key={r.id} className="bg-white border border-border-soft rounded-2xl p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div
                className="h-20 w-20 rounded-xl bg-gray-100 bg-cover bg-center flex-shrink-0 border border-slate-100"
                style={{ backgroundImage: `url('${r.product?.image || '/placeholder.png'}')` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{r.product?.name || 'Unknown Product'}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]">{i < r.rating ? 'star' : 'star_outline'}</span>
                        ))}
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Order #{r.orderId}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed italic line-clamp-2">"{r.comment}"</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400 bg-white border border-border-soft rounded-3xl">
              <span className="material-symbols-outlined text-5xl mb-3 block">rate_review</span>
              <p className="font-bold text-slate-900">No reviews yet</p>
              <p className="text-sm">You haven't left any feedback for your purchases.</p>
            </div>
          )}
        </div>
      )}

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
