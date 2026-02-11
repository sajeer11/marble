'use client';

import React, { useState } from 'react';

interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressSettings() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      firstName: 'Sajeer',
      lastName: 'Dev',
      fullAddress: '123 Rock Street, Marble District',
      city: 'Jakarta, 12345',
      phone: '+62 812 345 6789',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Office',
      firstName: 'Sajeer',
      lastName: 'Dev',
      fullAddress: '456 Stone Avenue, Business Complex',
      city: 'Jakarta, 12346',
      phone: '+62 812 345 6789',
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    label: '',
    firstName: '',
    lastName: '',
    fullAddress: '',
    city: '',
    phone: '',
    isDefault: false,
  });

  const handleAddAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
    };
    setAddresses([...addresses, address]);
    setNewAddress({
      label: '',
      firstName: '',
      lastName: '',
      fullAddress: '',
      city: '',
      phone: '',
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-1">Saved Addresses</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all flex items-center gap-2"
        >
          <span className="material-icons text-sm">add</span>
          Add Address
        </button>
      </div>

      {/* Add Address Form */}
      {showForm && (
        <div className="border-2 border-primary rounded-lg p-6 bg-primary/5 dark:bg-primary/10 space-y-4">
          <h3 className="font-bold text-lg dark:text-white">Add New Address</h3>
          
          <input
            type="text"
            placeholder="Label (e.g., Home, Office)"
            value={newAddress.label}
            onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={newAddress.firstName}
              onChange={(e) => setNewAddress({...newAddress, firstName: e.target.value})}
              className="h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newAddress.lastName}
              onChange={(e) => setNewAddress({...newAddress, lastName: e.target.value})}
              className="h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
            />
          </div>

          <input
            type="text"
            placeholder="Street Address"
            value={newAddress.fullAddress}
            onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
          />

          <input
            type="text"
            placeholder="City, ZIP Code"
            value={newAddress.city}
            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
            className="w-full h-10 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark dark:text-white"
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="dark:text-gray-300">Set as default address</span>
          </label>

          <div className="flex gap-4">
            <button
              onClick={handleAddAddress}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 relative">
            {address.isDefault && (
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span className="material-icons text-xs">check_circle</span>
                Default
              </div>
            )}
            
            <h3 className="font-bold text-lg dark:text-white mb-3">{address.label}</h3>
            
            <div className="space-y-2 text-sm dark:text-gray-300 mb-4">
              <p><strong>Name:</strong> {address.firstName} {address.lastName}</p>
              <p><strong>Address:</strong> {address.fullAddress}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Phone:</strong> {address.phone}</p>
            </div>

            <div className="flex gap-3 border-t dark:border-gray-700 pt-4">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-sm">check</span>
                  Set Default
                </button>
              )}
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <span className="material-icons text-sm">delete</span>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
