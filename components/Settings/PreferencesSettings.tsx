'use client';

import React, { useState, useEffect } from 'react';

interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  twoFactor: boolean;
}

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'auto',
    language: 'English',
    currency: 'USD',
    twoFactor: false,
  });

  const [saved, setSaved] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (preferences.theme === 'dark') {
      htmlElement.classList.add('dark');
    } else if (preferences.theme === 'light') {
      htmlElement.classList.remove('dark');
    } else {
      // auto - use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
    // Save to localStorage
    localStorage.setItem('theme', preferences.theme);
  }, [preferences.theme]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    if (savedTheme) {
      setPreferences(prev => ({ ...prev, theme: savedTheme }));
    }
  }, []);

  const handleChange = (key: keyof Preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-1">Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">Customize your app experience</p>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Preferences updated successfully
        </div>
      )}

      {/* Theme Selection */}
      <div className="border-b dark:border-gray-700 pb-6">
        <label className="text-sm font-semibold dark:text-gray-200 block mb-4">Appearance Theme</label>
        
        {/* Quick Toggle Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleChange('theme', 'light')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
              preferences.theme === 'light'
                ? 'border-primary bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="material-icons">light_mode</span>
            Light
          </button>
          <button
            onClick={() => handleChange('theme', 'dark')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
              preferences.theme === 'dark'
                ? 'border-primary bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="material-icons">dark_mode</span>
            Dark
          </button>
          <button
            onClick={() => handleChange('theme', 'auto')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
              preferences.theme === 'auto'
                ? 'border-primary bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="material-icons">brightness_auto</span>
            Auto
          </button>
        </div>

        {/* Radio Options */}
        <div className="space-y-3">
          {(['light', 'dark', 'auto'] as const).map((theme) => (
            <label key={theme} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-all">
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={preferences.theme === theme}
                onChange={(e) => handleChange('theme', e.target.value as any)}
                className="w-4 h-4 text-primary"
              />
              <span className="dark:text-gray-300 capitalize flex items-center gap-2">
                <span className="material-icons text-sm">
                  {theme === 'light' ? 'light_mode' : theme === 'dark' ? 'dark_mode' : 'brightness_auto'}
                </span>
                {theme === 'auto' ? 'System Preference' : `${theme.charAt(0).toUpperCase()}${theme.slice(1)} Mode`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="border-b dark:border-gray-700 pb-6">
        <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Language</label>
        <select
          value={preferences.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="w-full md:w-64 h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
        >
          <option>English</option>
          <option>Indonesian</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      {/* Currency */}
      <div className="border-b dark:border-gray-700 pb-6">
        <label className="text-sm font-semibold dark:text-gray-200 block mb-2">Currency</label>
        <select
          value={preferences.currency}
          onChange={(e) => handleChange('currency', e.target.value)}
          className="w-full md:w-64 h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
        >
          <option>USD - US Dollar</option>
          <option>EUR - Euro</option>
          <option>IDR - Indonesian Rupiah</option>
          <option>GBP - British Pound</option>
          <option>JPY - Japanese Yen</option>
        </select>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-b dark:border-gray-700 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold dark:text-gray-200 block mb-1">Two-Factor Authentication</label>
            <p className="text-xs text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.twoFactor}
              onChange={(e) => handleChange('twoFactor', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
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
