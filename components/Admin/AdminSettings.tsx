'use client';

import React, { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'MarbleLux',
    siteEmail: 'admin@marblelux.com',
    taxRate: 10,
    shippingCost: 50,
    freeShippingThreshold: 500,
    currency: 'USD',
    maintenanceMode: false,
    allowNewRegistrations: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'mail.marblelux.com',
    smtpPort: '587',
    fromEmail: 'noreply@marblelux.com',
    fromName: 'MarbleLux Admin',
  });

  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleEmailChange = (key: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your store settings and preferences</p>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Settings saved successfully
        </div>
      )}

      {/* Store Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-icons">store</span>
          Store Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Admin Email</label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) => handleSettingChange('siteEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="IDR">IDR (Rp)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Shipping Cost ({settings.currency})</label>
            <input
              type="number"
              value={settings.shippingCost}
              onChange={(e) => handleSettingChange('shippingCost', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Free Shipping Threshold ({settings.currency})</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => handleSettingChange('freeShippingThreshold', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Maintenance Mode (Site will be unavailable to customers)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowNewRegistrations}
              onChange={(e) => handleSettingChange('allowNewRegistrations', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Allow New Customer Registrations</span>
          </label>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-icons">mail</span>
          Email Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">SMTP Server</label>
            <input
              type="text"
              value={emailSettings.smtpServer}
              onChange={(e) => handleEmailChange('smtpServer', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">SMTP Port</label>
            <input
              type="text"
              value={emailSettings.smtpPort}
              onChange={(e) => handleEmailChange('smtpPort', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">From Email</label>
            <input
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => handleEmailChange('fromEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">From Name</label>
            <input
              type="text"
              value={emailSettings.fromName}
              onChange={(e) => handleEmailChange('fromName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all">
          Test Email Configuration
        </button>
      </div>

      {/* Backup & Security */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-icons">security</span>
          Backup & Security
        </h2>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons">backup</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Create Database Backup</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Last backup: Today at 2:30 PM</p>
              </div>
            </div>
            <span className="material-icons">arrow_forward</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons">restore</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Restore from Backup</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Restore from a previous backup</p>
              </div>
            </div>
            <span className="material-icons">arrow_forward</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <span className="material-icons">vpn_lock</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Change Admin Password</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Update your admin account password</p>
              </div>
            </div>
            <span className="material-icons">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <span className="material-icons">save</span>
        Save All Settings
      </button>
    </div>
  );
}
