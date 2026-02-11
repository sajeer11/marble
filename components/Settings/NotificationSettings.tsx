'use client';

import React, { useState } from 'react';

interface NotificationPrefs {
  orderUpdates: boolean;
  marketing: boolean;
  productReviews: boolean;
  newArrivals: boolean;
  priceDrops: boolean;
  weeklyNewsletter: boolean;
  emailDigest: 'daily' | 'weekly' | 'never';
}

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    orderUpdates: true,
    marketing: true,
    productReviews: true,
    newArrivals: true,
    priceDrops: false,
    weeklyNewsletter: true,
    emailDigest: 'weekly',
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof NotificationPrefs & (string | boolean)) => {
    if (typeof notifications[key] === 'boolean') {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleChange = (key: keyof NotificationPrefs, value: any) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const NotificationToggle = ({ label, value, onChange, description }: any) => (
    <div className="flex items-center justify-between py-4 border-b dark:border-gray-700 last:border-0">
      <div>
        <p className="font-semibold dark:text-white">{label}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-1">Notification Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">Control how we contact you</p>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Notification preferences updated
        </div>
      )}

      {/* Email Notifications Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">mail</span>
          Email Notifications
        </h3>

        <NotificationToggle
          label="Order Updates"
          value={notifications.orderUpdates}
          onChange={() => handleToggle('orderUpdates')}
          description="Receive updates about your orders (shipped, delivered, etc.)"
        />

        <NotificationToggle
          label="Marketing Emails"
          value={notifications.marketing}
          onChange={() => handleToggle('marketing')}
          description="Promotional offers, discounts, and special deals"
        />

        <NotificationToggle
          label="Product Reviews"
          value={notifications.productReviews}
          onChange={() => handleToggle('productReviews')}
          description="Requests to review products you've purchased"
        />

        <NotificationToggle
          label="New Arrivals"
          value={notifications.newArrivals}
          onChange={() => handleToggle('newArrivals')}
          description="Be the first to know about new marble & stone collections"
        />

        <NotificationToggle
          label="Price Drops"
          value={notifications.priceDrops}
          onChange={() => handleToggle('priceDrops')}
          description="Alert when prices drop on items you've viewed"
        />

        <NotificationToggle
          label="Weekly Newsletter"
          value={notifications.weeklyNewsletter}
          onChange={() => handleToggle('weeklyNewsletter')}
          description="Curated content and tips delivered every Sunday"
        />
      </div>

      {/* Email Digest Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">schedule</span>
          Email Digest
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">How often would you like to receive email digests?</p>

        <div className="space-y-3">
          {(['daily', 'weekly', 'never'] as const).map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="emailDigest"
                value={option}
                checked={notifications.emailDigest === option}
                onChange={(e) => handleChange('emailDigest', e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <span className="dark:text-gray-300 capitalize">
                {option === 'daily' && 'Daily Digest'}
                {option === 'weekly' && 'Weekly Digest (Recommended)'}
                {option === 'never' && 'Never'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* SMS Notifications Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
          <span className="material-icons">sms</span>
          SMS Notifications
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Receive time-sensitive updates via SMS. Standard text message rates may apply.
        </p>
        <NotificationToggle
          label="Order Shipment Tracking"
          value={true}
          onChange={() => {}}
          description="SMS alerts when your order ships and is out for delivery"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all flex items-center gap-2 mt-6"
      >
        <span className="material-icons text-sm">save</span>
        Save Preferences
      </button>
    </div>
  );
}
