'use client';

import React, { useState } from 'react';

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
  };

  const validatePassword = () => {
    if (!passwords.currentPassword) {
      setPasswordError('Current password is required');
      return false;
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return false;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSavePassword = () => {
    if (validatePassword()) {
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-1">Security Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your security and privacy</p>
      </div>

      {passwordSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Password changed successfully
        </div>
      )}

      {passwordError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">error</span>
          {passwordError}
        </div>
      )}

      {/* Change Password Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">lock</span>
          Change Password
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="border-t dark:border-gray-700 pt-4">
            <label className="text-sm font-semibold dark:text-gray-200 block mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your new password (min. 8 characters)"
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-enter your new password"
              className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={handleSavePassword}
            className="w-full px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span className="material-icons text-sm">save</span>
            Update Password
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">devices</span>
          Active Sessions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage your active login sessions across devices</p>

        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Jakarta, Indonesia', lastActive: 'Now' },
            { device: 'Safari on iPhone', location: 'Jakarta, Indonesia', lastActive: '2 hours ago' },
            { device: 'Chrome on MacBook', location: 'Jakarta, Indonesia', lastActive: '1 day ago' },
          ].map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <span className="material-icons text-gray-400">laptop</span>
                <div>
                  <p className="font-semibold dark:text-white text-sm">{session.device}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-semibold">
                Logout
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">privacy_tip</span>
          Privacy & Data
        </h3>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all flex items-center justify-between">
            <span className="text-sm font-semibold dark:text-white">Download Your Data</span>
            <span className="material-icons text-gray-400">arrow_forward</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all flex items-center justify-between">
            <span className="text-sm font-semibold dark:text-white">Delete Account</span>
            <span className="material-icons text-red-400">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
