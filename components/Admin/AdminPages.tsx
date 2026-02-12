'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/constants';

interface SectionConfig {
  enabled: boolean;
  title: string;
  description?: string;
  coverImage?: string;
  columns?: number;
  itemsPerRow?: number;
}

interface Section {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const PAGE_SECTIONS: Section[] = [
  { id: 'hero', name: 'Hero/Slider', icon: 'image', description: 'Full-width header with images and text' },
  { id: 'categories', name: 'Categories Grid', icon: 'grid_view', description: 'Product category showcase' },
  { id: 'featured', name: 'Featured Products', icon: 'star', description: 'Highlight best-selling items' },
  { id: 'features', name: 'Features/Icons', icon: 'info', description: 'Showcase brand benefits' },
  { id: 'inspiration', name: 'Room Inspiration', icon: 'photo_album', description: 'Gallery of room designs' },
  { id: 'design', name: 'Design Gallery', icon: 'collections', description: 'Product design showcase' },
];

export default function AdminPages() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'about'>('home');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState<Record<string, SectionConfig>>({
    hero: {
      enabled: true,
      title: 'Premium Marble Selection',
      description: 'Transform your home with luxury finishes',
      coverImage: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=1400&h=400&q=80'
    },
    categories: { enabled: true, title: 'Shop by Category', columns: 4 },
    featured: { enabled: true, title: 'Featured Products', itemsPerRow: 4 },
    features: { enabled: true, title: 'Why Choose Us', description: 'Premium quality, fast shipping, 24/7 support' },
    inspiration: { enabled: true, title: 'Room Inspiration', description: 'See how our products transform spaces' },
    design: { enabled: true, title: 'Design Gallery', description: 'Explore stunning marble designs' },
  });

  useEffect(() => {
    loadSections();
  }, [currentPage]);

  const loadSections = async () => {
    try {
      const response = await fetch(`/api/page-sections?page=${currentPage}`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();

      // If we got data from DB, use it; otherwise keep defaults
      if (data && data.length > 0) {
        const dbSections: Record<string, SectionConfig> = {};
        data.forEach((sec: any) => {
          dbSections[sec.sectionId] = {
            enabled: sec.enabled,
            title: sec.title || '',
            description: sec.description || '',
            coverImage: sec.coverImage || '',
            ...sec.settings,
          };
        });
        setSections(prev => ({ ...prev, ...dbSections }));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading sections:', error);
      setLoading(false);
    }
  };

  const handleToggle = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], enabled: !prev[sectionId].enabled }
    }));
  };

  const handleUpdate = (sectionId: string, field: string, value: any) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [field]: value }
    }));
  };

  const handleSave = async () => {
    try {
      // Save all sections to DB
      const promises = Object.entries(sections).map(([sectionId, config]) => {
        const { columns, itemsPerRow, ...basicFields } = config;
        return fetch('/api/page-sections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: currentPage,
            sectionId,
            ...basicFields,
            settings: { columns, itemsPerRow },
          }),
        });
      });

      await Promise.all(promises);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving sections:', error);
      alert('Failed to save sections');
    }
  };

  // Preview Components
  const PreviewSection = ({ section }: { section: Section }) => {
    const config = sections[section.id];

    if (!config.enabled) {
      return (
        <div className="py-12 px-6 text-center text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <span className="material-icons text-5xl opacity-30 block mb-2">visibility_off</span>
          <p>This section is disabled and hidden from users</p>
        </div>
      );
    }

    switch (section.id) {
      case 'hero':
        return (
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={config.coverImage}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold">{config.title}</h2>
                {config.description && <p className="text-lg text-gray-200 mt-2">{config.description}</p>}
              </div>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{config.title}</h2>
            <div className={`grid grid-cols-${config.columns || 4} gap-6`}>
              {['Marble', 'Tiles', 'Natural Stone', 'Slabs'].slice(0, config.columns).map((cat) => (
                <div key={cat} className="bg-gradient-to-br from-yellow-50 to-gray-100 dark:from-yellow-900/20 dark:to-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={`https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=300&q=80`}
                    alt={cat}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 text-center">
                    <p className="font-bold text-gray-900 dark:text-white">{cat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'featured':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{config.title}</h2>
            <div className={`grid grid-cols-${config.itemsPerRow || 4} gap-6`}>
              {PRODUCTS.slice(0, config.itemsPerRow || 4).map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{product.name}</p>
                    <p className="text-yellow-600 font-bold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
            {config.description && <p className="text-gray-600 dark:text-gray-400 mb-8">{config.description}</p>}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: 'verified', title: 'Premium Quality', text: '100% authentic marble' },
                { icon: 'local_shipping', title: 'Fast Shipping', text: 'Worldwide delivery' },
                { icon: 'support_agent', title: '24/7 Support', text: 'Always here to help' },
              ].map((feat, i) => (
                <div key={i} className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="material-icons text-4xl text-yellow-600 block mb-2">{feat.icon}</span>
                  <p className="font-bold text-gray-900 dark:text-white">{feat.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'inspiration':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
            {config.description && <p className="text-gray-600 dark:text-gray-400 mb-8">{config.description}</p>}
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-157850049419-8${i}246f612d03b3?auto=format&fit=crop&w=400&q=80`}
                    alt={`Inspiration ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'design':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
            {config.description && <p className="text-gray-600 dark:text-gray-400 mb-8">{config.description}</p>}
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-40 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-157850049419-846f612d03b3?auto=format&fit=crop&w=300&q=80`}
                    alt={`Design ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const current = sections[expandedSection || ''] || null;
  const currentSection = PAGE_SECTIONS.find(s => s.id === expandedSection);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pages & Sections</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Edit your website sections with live preview</p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            <span className="material-icons text-sm">{showPreview ? 'visibility_off' : 'visibility'}</span>
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-3 flex gap-2">
        {(['home', 'shop', 'about'] as const).map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              setExpandedSection(null);
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${currentPage === page
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
              }`}
          >
            {page} Page
          </button>
        ))}
      </div>

      {/* Saved Notification */}
      {saved && (
        <div className="mx-6 mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
          <span className="material-icons text-sm">check_circle</span>
          Configuration saved successfully to {currentPage} page
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-hidden flex ${showPreview ? 'gap-4' : ''} p-6`}>
        {/* Left: Editor */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Sections ({sections ? Object.values(sections).filter(s => s.enabled).length : 0} enabled)</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-3">
              {PAGE_SECTIONS.map((section) => {
                const config = sections[section.id] || { enabled: false, title: '', description: '' };
                const isExpanded = expandedSection === section.id;

                return (
                  <div
                    key={section.id}
                    className={`border-2 rounded-lg transition-all cursor-pointer ${isExpanded
                        ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                        : `border-gray-300 dark:border-gray-600 ${config.enabled ? 'hover:border-yellow-600' : 'opacity-50'}`
                      }`}
                  >
                    {/* Section Header */}
                    <div
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                      className={`p-4 flex items-center justify-between ${isExpanded ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${config.enabled ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'}`}>
                          <span className="material-icons text-sm">{section.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{section.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{section.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={config.enabled}
                            onChange={() => handleToggle(section.id)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-600 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                        </label>
                        <span className="material-icons text-gray-400 text-sm">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                      </div>
                    </div>

                    {/* Section Editor */}
                    {isExpanded && (
                      <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 p-6 space-y-4">
                        {/* Hero Section */}
                        {section.id === 'hero' && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Hero Title</label>
                              <input
                                type="text"
                                value={config.title}
                                onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                              <input
                                type="text"
                                value={config.coverImage || ''}
                                onChange={(e) => handleUpdate(section.id, 'coverImage', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                              {config.coverImage && (
                                <img src={config.coverImage} alt="Preview" className="w-full h-20 object-cover rounded-lg mt-2" />
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                              <textarea
                                value={config.description || ''}
                                onChange={(e) => handleUpdate(section.id, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                          </>
                        )}

                        {/* Categories & Featured */}
                        {(section.id === 'categories' || section.id === 'featured') && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Section Title</label>
                              <input
                                type="text"
                                value={config.title}
                                onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Columns</label>
                              <div className="flex gap-2">
                                {[2, 3, 4].map((col) => (
                                  <button
                                    key={col}
                                    onClick={() => handleUpdate(section.id, section.id === 'featured' ? 'itemsPerRow' : 'columns', col)}
                                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${(section.id === 'featured' ? config.itemsPerRow : config.columns) === col
                                        ? 'bg-yellow-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                      }`}
                                  >
                                    {col} Cols
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Other Sections */}
                        {(section.id === 'features' || section.id === 'inspiration' || section.id === 'design') && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Section Title</label>
                              <input
                                type="text"
                                value={config.title}
                                onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                              <textarea
                                value={config.description || ''}
                                onChange={(e) => handleUpdate(section.id, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                          </>
                        )}

                        <div className="flex gap-2 pt-4 border-t dark:border-gray-600">
                          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all text-sm">
                            Update Section
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t dark:border-gray-700 p-6">
            <button
              onClick={handleSave}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <span className="material-icons">save</span>
              Save All Changes
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        {showPreview && (
          <div className="w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-icons">preview</span>
                Live Preview
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {expandedSection && currentSection ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 text-sm">
                    <span className="material-icons text-sm">info</span>
                    Editing: {currentSection.name}
                  </div>
                  <PreviewSection section={currentSection} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <span className="material-icons text-6xl opacity-30 mb-2">image_not_supported</span>
                  <p className="text-center">Select a section to see its preview</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
