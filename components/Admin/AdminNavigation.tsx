'use client';

import React, { useEffect, useState } from 'react';

interface NavLink {
  id?: number;
  label: string;
  path: string;
  icon?: string;
  active: boolean;
  order?: number;
}

export default function AdminNavigation() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ label: '', path: '', icon: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/navigation', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setNavLinks(data);
        } else {
          setNavLinks([
            { label: 'Home', path: '/', icon: 'home', active: true },
            { label: 'Shop', path: '/shop', icon: 'shopping_bag', active: true },
            { label: 'About', path: '/about', icon: 'info', active: true },
            { label: 'Contact', path: '/contact', icon: 'mail', active: true },
          ]);
        }
      } catch {
        setNavLinks([
          { label: 'Home', path: '/', icon: 'home', active: true },
          { label: 'Shop', path: '/shop', icon: 'shopping_bag', active: true },
          { label: 'About', path: '/about', icon: 'info', active: true },
          { label: 'Contact', path: '/contact', icon: 'mail', active: true },
        ]);
      }
    };
    load();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.label.trim() || !formData.path.trim()) return;
    if (editingId) {
      const updated = navLinks.map(link =>
        link.id === editingId ? { ...link, label: formData.label, path: formData.path, icon: formData.icon } : link
      );
      setNavLinks(updated);
      fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, label: formData.label, path: formData.path, icon: formData.icon }),
      }).catch(() => {});
    } else {
      const order = navLinks.length;
      fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: formData.label, path: formData.path, icon: formData.icon || 'link', active: true, order }),
      })
        .then(async (res) => {
          if (res.ok) {
            const created = await res.json();
            setNavLinks([...navLinks, created]);
          } else {
            setNavLinks([...navLinks, { label: formData.label, path: formData.path, icon: formData.icon || 'link', active: true, order }]);
          }
        })
        .catch(() => {
          setNavLinks([...navLinks, { label: formData.label, path: formData.path, icon: formData.icon || 'link', active: true, order }]);
        });
    }
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = (link: NavLink) => {
    setFormData({ label: link.label, path: link.path, icon: link.icon || '' });
    setEditingId(link.id || null);
    setShowForm(true);
  };

  const handleDelete = (id?: number) => {
    if (typeof id !== 'number') return;
    setNavLinks(navLinks.filter(link => (link.id || 0) !== id));
    fetch(`/api/navigation?id=${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const toggleActive = (id?: number) => {
    if (typeof id !== 'number') return;
    const updated = navLinks.map(link =>
      (link.id || 0) === id ? { ...link, active: !link.active } : link
    );
    setNavLinks(updated);
    const target = updated.find(l => (l.id || 0) === id);
    if (target) {
      fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: target.active }),
      }).catch(() => {});
    }
  };

  const moveLink = (id?: number, direction?: 'up' | 'down') => {
    if (typeof id !== 'number' || !direction) return;
    const index = navLinks.findIndex(link => (link.id || 0) === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === navLinks.length - 1)) {
      return;
    }
    const newLinks = [...navLinks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    setNavLinks(newLinks);
    const a = newLinks[index];
    const b = newLinks[swapIndex];
    if (a?.id && b?.id) {
      fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: a.id, order: index }),
      }).catch(() => {});
      fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: b.id, order: swapIndex }),
      }).catch(() => {});
    }
  };

  const resetForm = () => {
    setFormData({ label: '', path: '', icon: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const MATERIAL_ICONS = [
    'home', 'shopping_bag', 'info', 'mail', 'settings', 'person', 'search',
    'favorite', 'shopping_cart', 'menu', 'account_circle', 'logout', 'store',
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Navigation Menu</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your main navigation menu items</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          <span className="material-icons">add</span>
          Add Menu Item
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Navigation updated successfully
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Menu Label *</label>
              <input
                type="text"
                name="label"
                placeholder="e.g., Shop, About, Contact"
                value={formData.label}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Path/URL *</label>
              <input
                type="text"
                name="path"
                placeholder="e.g., /shop, /about, /contact"
                value={formData.path}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Icon (optional)</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-3">
              {MATERIAL_ICONS.map(icon => (
                <button
                  key={icon}
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.icon === icon
                      ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-yellow-600'
                  }`}
                  title={icon}
                >
                  <span className="material-icons text-gray-700 dark:text-gray-300">{icon}</span>
                </button>
              ))}
            </div>
            {formData.icon && (
              <div className="text-sm text-gray-600 dark:text-gray-400">Selected icon: {formData.icon}</div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Save Menu Item
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Navigation Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Order</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Label</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Path</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Icon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Active</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {navLinks.map((link, index) => (
                <tr key={link.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveLink(link.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                        title="Move up"
                      >
                        <span className="material-icons text-sm">arrow_upward</span>
                      </button>
                      <button
                        onClick={() => moveLink(link.id, 'down')}
                        disabled={index === navLinks.length - 1}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                        title="Move down"
                      >
                        <span className="material-icons text-sm">arrow_downward</span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{link.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{link.path}</td>
                  <td className="px-6 py-4 text-sm">
                    {link.icon && <span className="material-icons text-gray-700 dark:text-gray-300">{link.icon}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(link.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                        link.active
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className="material-icons text-xs">{link.active ? 'check_circle' : 'cancel'}</span>
                      {link.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(link)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg transition-all inline-flex items-center gap-2"
                    >
                      <span className="material-icons text-sm">edit</span>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg transition-all inline-flex items-center gap-2"
                    >
                      <span className="material-icons text-sm">delete</span>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import/Export Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <span className="material-icons">cloud_upload</span>
          Import/Export Navigation
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">Backup your navigation menu or import from a backup</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              const json = JSON.stringify(navLinks, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'navigation-menu.json';
              a.click();
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            <span className="material-icons">download</span>
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  );
}
