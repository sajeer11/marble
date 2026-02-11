'use client';

import React from 'react';
import SettingsBanner from '@/components/Settings/SettingsBanner';
import SettingsMain from '@/components/Settings/SettingsMain';

export default function Settings() {
  return (
    <div className="flex flex-col">
      <SettingsBanner />
      <SettingsMain />
    </div>
  );
}
