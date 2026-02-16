'use client';

import React from 'react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const ADMIN_MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'products', label: 'Products', icon: 'inventory_2' },
  { id: 'orders', label: 'Orders', icon: 'shopping_cart' },
  { id: 'customers', label: 'Customers', icon: 'people' },
  { id: 'pages', label: 'Pages & Sections', icon: 'pages' },
  { id: 'categories', label: 'Categories', icon: 'category' },
  { id: 'navigation', label: 'Navigation', icon: 'menu' },
  { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
  { id: 'reviews', label: 'Reviews', icon: 'rate_review' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="material-icons text-yellow-600 text-3xl">admin_panel_settings</span>
          <div>
            <h2 className="text-xl font-bold">Admin</h2>
            <p className="text-xs text-gray-400">MarbleLux Control</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {ADMIN_MENU.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-left ${activeTab === item.id
                ? 'bg-yellow-600 text-white font-semibold'
                : 'text-gray-300 hover:bg-gray-800'
              }`}
          >
            <span className="material-icons text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-all text-sm">
          <span className="material-icons text-lg">account_circle</span>
          <span>Admin Profile</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-all text-sm">
          <span className="material-icons text-lg">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
