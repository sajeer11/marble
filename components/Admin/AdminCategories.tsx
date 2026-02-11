'use client';

import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false); // ✅ added this line

  // Load categories from API on component mount and every 5 seconds for real-time updates
  useEffect(() => {
    loadCategories();
    const interval = setInterval(loadCategories, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading categories:', err);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'slug' ? value.toLowerCase().replace(/\s+/g, '-') : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        image: formData.image || null,
        description: formData.description || null,
        enabled: true,
      };

      if (editingId) {
        // Update existing category
        const response = await fetch(`/api/categories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update category');
      } else {
        // Create new category
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create category');
      }

      // ✅ After successful save
      await loadCategories();
      resetForm();
      setSaved(true); // show success message
      setTimeout(() => setSaved(false), 3000); // hide it after 3 seconds
    } catch (err: any) {
      setError(err.message);
      console.error('Error saving category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      image: category.image || '',
      description: category.description || '',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');

      // Reload categories
      await loadCategories();
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting category:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', image: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product categories and their display</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          <span className="material-icons">add</span>
          Add Category
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {saved && ( // ✅ success message now works
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg flex items-center gap-2">
          <span className="material-icons text-sm">check_circle</span>
          Category saved successfully
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Category Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Marble, Natural Stone"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">URL Slug (auto-generated)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Category Image URL *</label>
            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-4" />
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Category description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              {loading ? <span className="animate-spin">⚙️</span> : null}
              {loading ? 'Saving...' : 'Save Category'}
            </button>
            <button
              onClick={resetForm}
              disabled={loading}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={category.image ?? '/placeholder.jpg'} alt={category.name} className="w-full h-40 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-icons text-sm">shopping_bag</span>
                <span>{category.id} products</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-xs text-gray-700 dark:text-gray-300 font-mono inline-block">
                /category/{category.slug}
              </div>
              <div className="flex gap-2 pt-4 border-t dark:border-gray-700">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-sm">edit</span>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-sm">delete</span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
