'use client';

import React, { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import AccountSettings from './AccountSettings';
import PreferencesSettings from './PreferencesSettings';
import AddressSettings from './AddressSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

type SettingsTab = 'account' | 'preferences' | 'address' | 'notifications' | 'security';

export default function SettingsMain() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'address':
        return <AddressSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-lg p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
