import React from 'react';

export default function SettingsBanner() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-72 bg-[url('https://images.unsplash.com/photo-1551632786-de41ec6a05ae?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="font-medium">Home</span>
          <span className="material-icons text-sm">chevron_right</span>
          <span className="font-light">Settings</span>
        </div>
      </div>
    </section>
  );
}
