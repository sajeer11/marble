'use client';

import React from 'react';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const SETTINGS_MENU = [
  { id: 'account', label: 'Account Settings', icon: 'person' },
  { id: 'preferences', label: 'Preferences', icon: 'tune' },
  { id: 'address', label: 'Saved Addresses', icon: 'location_on' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications_active' },
  { id: 'security', label: 'Security', icon: 'lock' },
];

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const { logout } = useUserAuth();
  return (
    <div className="md:col-span-1">
      <div className="bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden sticky top-24">
        <div className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="material-icons">settings</span>
            Settings
          </h3>
        </div>

        <nav className="space-y-1 p-4">
          {SETTINGS_MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${activeTab === item.id
                  ? 'bg-primary text-white font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <span className="material-icons text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t dark:border-gray-700 p-4">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left font-semibold">
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
