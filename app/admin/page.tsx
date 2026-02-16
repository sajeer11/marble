'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/components/Admin/AdminAuthContext';
import { ProtectedAdminRoute } from '@/components/Admin/ProtectedAdminRoute';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import AdminProducts from '@/components/Admin/AdminProducts';
import AdminOrders from '@/components/Admin/AdminOrders';
import AdminCustomers from '@/components/Admin/AdminCustomers';
import AdminPages from '@/components/Admin/AdminPages';
import AdminCategories from '@/components/Admin/AdminCategories';
import AdminNavigation from '@/components/Admin/AdminNavigation';
import AdminAnalytics from '@/components/Admin/AdminAnalytics';
import AdminSettings from '@/components/Admin/AdminSettings';
import AdminReviews from '@/components/Admin/AdminReviews';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers' | 'pages' | 'categories' | 'navigation' | 'analytics' | 'reviews' | 'settings';

function AdminContent() {
  const router = useRouter();
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'customers':
        return <AdminCustomers />;
      case 'pages':
        return <AdminPages />;
      case 'categories':
        return <AdminCategories />;
      case 'navigation':
        return <AdminNavigation />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'reviews':
        return <AdminReviews />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 flex-col">
      {/* Header with Logout */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <div></div>
        <button
          onClick={() => {
            logout();
            router.push('/admin/login');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm"
        >
          <span className="material-icons text-sm">logout</span>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <ProtectedAdminRoute>
      <AdminContent />
    </ProtectedAdminRoute>
  );
}
