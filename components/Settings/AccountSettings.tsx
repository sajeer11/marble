'use client';

import React, { useEffect, useState } from 'react';
import { useUserAuth } from '@/contexts/UserAuthContext';

interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

export default function AccountSettings() {
  const { user, isLoggedIn } = useUserAuth();
  const [formData, setFormData] = useState<AccountData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarbleLux',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const pid = typeof user?.id === 'number' ? user?.id : parseInt(String(user?.id || 0));
    if (!pid) return;
    fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: pid, profile: formData }),
    }).then(() => {
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!isLoggedIn || !user?.id) return;
      const pid = typeof user.id === 'number' ? user.id : parseInt(String(user.id));
      try {
        const res = await fetch(`/api/user/profile?userId=${pid}`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || user.email,
              phone: data.phone || '',
              avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarbleLux',
            });
          } else {
            setFormData(prev => ({
              ...prev,
              email: user.email,
            }));
          }
        }
      } catch {}
      // Fill from user.name if missing
      const uname = user?.name || '';
      if (uname && (!formData.firstName || !formData.lastName)) {
        const parts = uname.split(' ');
        setFormData(prev => ({
          ...prev,
          firstName: prev.firstName || parts[0] || '',
          lastName: prev.lastName || parts.slice(1).join(' ') || '',
        }));
      }
      // Fetch latest checkout info to auto-populate phone
      try {
        if (user?.email) {
          const oRes = await fetch(`/api/checkout?email=${encodeURIComponent(user.email)}`);
          if (oRes.ok) {
            const orders = await oRes.json();
            if (Array.isArray(orders) && orders.length > 0) {
              const latest = orders[0];
              const phone = latest?.phone || '';
              const cname = latest?.customerName || '';
              setFormData(prev => ({
                ...prev,
                phone: prev.phone || phone,
                firstName: prev.firstName || (cname ? String(cname).split(' ')[0] : prev.firstName),
                lastName: prev.lastName || (cname ? String(cname).split(' ').slice(1).join(' ') : prev.lastName),
              }));
            }
          }
        }
      } catch {}
    };
    init();
  }, [isLoggedIn, user?.id, user?.email]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-1">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Account information updated successfully
        </div>
      )}

      {/* Avatar Section */}
      <div className="border-b dark:border-gray-700 pb-6">
        <label className="text-sm font-semibold dark:text-gray-200 block mb-4">Profile Avatar</label>
        <div className="flex items-center gap-6">
          <img 
            src={formData.avatar} 
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-primary"
          />
          <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all">
            Upload New Avatar
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold dark:text-gray-200 block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark disabled:bg-gray-50 dark:disabled:bg-gray-800 dark:text-white transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark disabled:bg-gray-50 dark:disabled:bg-gray-800 dark:text-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark disabled:bg-gray-50 dark:disabled:bg-gray-800 dark:text-white transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark disabled:bg-gray-50 dark:disabled:bg-gray-800 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all flex items-center gap-2"
          >
            <span className="material-icons text-sm">edit</span>
            Edit Information
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <span className="material-icons text-sm">save</span>
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
