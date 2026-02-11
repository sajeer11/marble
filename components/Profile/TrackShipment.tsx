
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const TrackShipment: React.FC = () => {
  const { id } = useParams();

  const steps = [
    { title: 'Order Placed', desc: 'We have received your order and payment.', date: 'Oct 18, 10:30 AM', icon: 'check', status: 'completed' },
    { title: 'Quality Inspection', desc: 'Marble slab verified for grain perfection and hand-polished finish.', date: 'Oct 19, 2:15 PM', icon: 'verified', status: 'completed' },
    { title: 'In Transit', desc: 'Departed from Milan Distribution Center.', date: 'Oct 20, 09:00 AM', icon: 'local_shipping', status: 'current' },
    { title: 'Delivered', desc: 'Expected by Oct 24 • White-glove delivery to your designated room.', date: 'Expected Oct 24', icon: 'home', status: 'upcoming' },
  ];

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
        <Link href="/" className="text-slate-400 hover:text-accent-gold transition-colors">Home</Link>
        <span className="text-slate-600">/</span>
        <Link href="/orders" className="text-slate-400 hover:text-accent-gold transition-colors">Account</Link>
        <span className="text-slate-300">/</span>
        <span className="text-primary">Track Shipment</span>
      </nav>

      <div className="flex flex-wrap justify-between items-end gap-6 pb-10 border-b border-slate-100">
        <div className="flex flex-col gap-3">
          <h1 className="text-slate-900 text-4xl font-light leading-tight tracking-tight">Track Your Shipment</h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            Order #{id || 'LX-99283-MB'} • <span className="text-slate-600 italic">Carrara Marble Coffee Table</span>
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl flex flex-col items-end shadow-sm">
          <p className="text-accent-gold text-[10px] font-extrabold uppercase tracking-[0.2em] mb-1">Estimated Delivery</p>
          <p className="text-slate-900 text-3xl font-light">October 24, 2023</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-slate-900 text-xl font-medium mb-12 tracking-tight">Shipping Progress</h2>
          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <div key={idx} className="grid grid-cols-[64px_1fr] gap-x-2">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 shadow-sm
                    ${step.status === 'completed' ? 'bg-slate-50 border-slate-100 text-accent-gold' : 
                      step.status === 'current' ? 'bg-primary text-white scale-110 shadow-xl shadow-primary/20' : 
                      'bg-white border-slate-100 text-slate-300'}
                  `}>
                    <span className="material-symbols-outlined !text-xl">{step.icon}</span>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className={`w-[1px] h-24 ${step.status === 'completed' ? 'bg-slate-200' : 'bg-slate-100'}`} />
                  )}
                </div>
                <div className={`flex flex-col ${idx !== steps.length - 1 ? 'pb-12' : ''}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <p className={`text-lg font-medium leading-none ${step.status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>
                      {step.title}
                    </p>
                    {step.status === 'current' && (
                      <span className="px-2 py-0.5 bg-accent-gold/10 text-accent-gold text-[9px] font-bold uppercase tracking-widest rounded-full">Current Status</span>
                    )}
                  </div>
                  <p className={`text-sm ${step.status === 'upcoming' ? 'text-slate-300' : 'text-slate-400'}`}>
                    {step.date} • {step.desc}
                  </p>
                  
                  {step.status === 'current' && (
                    <div className="mt-5 p-5 rounded-xl border border-slate-100 bg-slate-50/50 shadow-sm">
                      <p className="text-[10px] uppercase text-slate-400 font-extrabold tracking-widest mb-2">Current Location</p>
                      <p className="text-slate-700 text-sm font-medium">Zurich International Logistics Hub, Switzerland</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-slate-900 text-xs font-extrabold uppercase tracking-[0.2em] mb-6">Courier Details</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center border border-slate-100">
                  <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Carrier</p>
                  <p className="text-slate-800 font-medium text-sm">Global Express Luxury</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-2">Tracking Number</p>
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-100">
                  <code className="text-slate-800 text-xs font-bold">LX-7788-2991-MB</code>
                  <button className="text-slate-300 hover:text-accent-gold transition-colors">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-slate-900 text-xs font-extrabold uppercase tracking-[0.2em] mb-6">Delivery Address</h3>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-slate-300 mt-1">location_on</span>
              <div className="text-slate-500 text-sm leading-relaxed font-normal">
                <p className="font-bold text-slate-800 mb-1">Julianne Moore</p>
                <p>452 Kensington High Street</p>
                <p>Apartment 4B, Kensington</p>
                <p>London, W8 7DP</p>
                <p>United Kingdom</p>
              </div>
            </div>
          </div>

          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-100 group cursor-pointer shadow-sm">
            <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
              <div className="absolute flex flex-col items-center z-10">
                <span className="material-symbols-outlined text-accent-gold text-3xl mb-2">map</span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Interactive Tracking</span>
              </div>
              <img className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" src="https://picsum.photos/seed/map/400/300" alt="Map View" />
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest text-slate-600 border border-slate-100 z-10">
              Live Map View
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 p-10 rounded-[2rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/80 text-2xl">support_agent</span>
          </div>
          <div>
            <h4 className="text-xl font-light mb-1">Assistance with your delivery?</h4>
            <p className="text-slate-400 text-sm font-normal">Our white-glove logistics team is ready to help with any special requests.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-colors">Contact Support</button>
          <button className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/5 transition-colors">View FAQs</button>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
