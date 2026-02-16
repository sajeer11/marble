'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/constants';
import ImageUpload from './ImageUpload';

interface SectionConfig {
  enabled: boolean;
  title: string;
  description?: string;
  coverImage?: string;
  columns?: number;
  itemsPerRow?: number;
  fields?: any[];
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

interface Section {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const PAGE_SECTIONS_CONFIG: Record<string, Section[]> = {
  home: [
    { id: 'hero', name: 'Hero/Slider', icon: 'image', description: 'Full-width header with images and text' },
    { id: 'categories', name: 'Categories Grid', icon: 'grid_view', description: 'Product category showcase' },
    { id: 'featured', name: 'Featured Products', icon: 'star', description: 'Highlight best-selling items' },
    { id: 'features', name: 'Features/Icons', icon: 'info', description: 'Showcase brand benefits' },
    { id: 'inspiration', name: 'Room Inspiration', icon: 'photo_album', description: 'Gallery of room designs' },
    { id: 'design', name: 'Design Gallery', icon: 'collections', description: 'Product design showcase' },
  ],
  shop: [
    { id: 'banner', name: 'Shop Banner', icon: 'image', description: 'Header for the shop page' },
    { id: 'products', name: 'Product Grid', icon: 'grid_view', description: 'Main products display' },
  ],
  about: [
    { id: 'hero', name: 'About Hero', icon: 'image', description: 'Introduction to about page' },
    { id: 'journey', name: 'Our Journey', icon: 'history', description: 'Brand story and timeline' },
    { id: 'features', name: 'Key Features', icon: 'star', description: 'Highlight what makes us unique' },
  ],
  contact: [
    { id: 'banner', name: 'Contact Banner', icon: 'image', description: 'Header for contact page' },
    { id: 'intro', name: 'Introduction', icon: 'edit', description: 'Get in touch message' },
    { id: 'info', name: 'Contact Info', icon: 'contact_page', description: 'Address, phone, etc.' },
    { id: 'form', name: 'Contact Form', icon: 'form', description: 'Dynamic form fields' },
    { id: 'map', name: 'Location Map', icon: 'map', description: 'Interactive map display' },
  ]
};

export default function AdminPages() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'about' | 'contact'>('home');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState<Record<string, SectionConfig>>({});

  useEffect(() => {
    loadSections();
  }, [currentPage]);

  const loadSections = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/page-sections?page=${currentPage}`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();

      const pageSections = PAGE_SECTIONS_CONFIG[currentPage];
      const initialSections: Record<string, SectionConfig> = {};

      // Initialize with defaults if empty
      pageSections.forEach(s => {
        initialSections[s.id] = { enabled: true, title: s.name };
      });

      if (data && data.length > 0) {
        data.forEach((sec: any) => {
          initialSections[sec.sectionId] = {
            ...initialSections[sec.sectionId], // Keep default title if not in DB
            enabled: sec.enabled,
            title: sec.title || initialSections[sec.sectionId]?.title || '',
            description: sec.description || '',
            coverImage: sec.coverImage || '',
            ...sec.settings,
          };
        });
      }
      setSections(initialSections);
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

  const [previewKey, setPreviewKey] = useState(0);

  const handleSave = async () => {
    try {
      const promises = Object.entries(sections).map(([sectionId, config]) => {
        const { ...settings } = config;
        const basicFields = {
          title: config.title,
          description: config.description,
          coverImage: config.coverImage,
          enabled: config.enabled
        };

        return fetch('/api/page-sections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: currentPage,
            sectionId,
            ...basicFields,
            settings: settings,
          }),
        });
      });

      await Promise.all(promises);
      setSaved(true);
      setPreviewKey(prev => prev + 1);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving sections:', error);
      alert('Failed to save sections');
    }
  };

  const previewUrl = currentPage === 'home' ? '/' : `/${currentPage}`;

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
        {(['home', 'shop', 'about', 'contact'] as const).map((page) => (
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
              {PAGE_SECTIONS_CONFIG[currentPage].map((section) => {
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
                        {/* General Section Settings */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Section Heading</label>
                            <input
                              type="text"
                              value={config.title}
                              onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                            />
                          </div>

                          {(section.id === 'hero' || section.id === 'banner' || section.id === 'inspiration' || section.id === 'journey') && (
                            <ImageUpload
                              label="Background/Cover Image"
                              value={config.coverImage || ''}
                              onChange={(url) => handleUpdate(section.id, 'coverImage', url)}
                            />
                          )}

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description / Lead Text</label>
                            <textarea
                              value={config.description || ''}
                              onChange={(e) => handleUpdate(section.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                            />
                          </div>

                          {/* Grid Settings */}
                          {(section.id === 'categories' || section.id === 'featured' || section.id === 'features') && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Items Per Row (Columns)</label>
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
                                    {col} Columns
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contact Info Specifics */}
                        {section.id === 'info' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Section Title</label>
                              <input
                                type="text"
                                value={config.title}
                                onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Physical Address</label>
                              <input
                                type="text"
                                value={config.address || ''}
                                onChange={(e) => handleUpdate(section.id, 'address', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                              <input
                                type="text"
                                value={config.phone || ''}
                                onChange={(e) => handleUpdate(section.id, 'phone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                              <input
                                type="email"
                                value={config.email || ''}
                                onChange={(e) => handleUpdate(section.id, 'email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Working Hours</label>
                              <input
                                type="text"
                                value={config.hours || ''}
                                onChange={(e) => handleUpdate(section.id, 'hours', e.target.value)}
                                placeholder="Mon-Fri: 9-5"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-yellow-600 outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* Dynamic Form Editor */}
                        {section.id === 'form' && (
                          <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Form Fields</label>
                            <div className="space-y-2">
                              {(config.fields || [
                                { label: 'Your Name', type: 'text', placeholder: 'Abc' },
                                { label: 'Email Address', type: 'email', placeholder: 'Abc@def.com' },
                                { label: 'Subject', type: 'text', placeholder: 'This is an optional' },
                                { label: 'Message', type: 'textarea', placeholder: 'Hi! I\'d like to ask about...' }
                              ]).map((field: any, idx: number) => (
                                <div key={idx} className="flex gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-600 items-start">
                                  <div className="flex-1 grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={field.label}
                                      onChange={(e) => {
                                        const newFields = [...(config.fields || [])];
                                        newFields[idx].label = e.target.value;
                                        handleUpdate(section.id, 'fields', newFields);
                                      }}
                                      className="px-3 py-1 text-xs border rounded dark:bg-gray-700"
                                      placeholder="Label"
                                    />
                                    <select
                                      value={field.type}
                                      onChange={(e) => {
                                        const newFields = [...(config.fields || [])];
                                        newFields[idx].type = e.target.value;
                                        handleUpdate(section.id, 'fields', newFields);
                                      }}
                                      className="px-3 py-1 text-xs border rounded dark:bg-gray-700"
                                    >
                                      <option value="text">Text</option>
                                      <option value="email">Email</option>
                                      <option value="textarea">Message/Textarea</option>
                                      <option value="tel">Phone</option>
                                    </select>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const newFields = (config.fields || []).filter((_: any, i: number) => i !== idx);
                                      handleUpdate(section.id, 'fields', newFields);
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                  >
                                    <span className="material-icons text-xs">delete</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                const newFields = [...(config.fields || []), { label: 'New Field', type: 'text', placeholder: '' }];
                                handleUpdate(section.id, 'fields', newFields);
                              }}
                              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 rounded-lg text-sm hover:border-yellow-600 hover:text-yellow-600 transition-all"
                            >
                              + Add Field
                            </button>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4 border-t dark:border-gray-600">
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-xs">sync</span>
                            Update & Preview
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

            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full border dark:border-gray-700 rounded-lg overflow-hidden bg-white">
                  <iframe
                    key={previewKey}
                    src={previewUrl}
                    className="w-full h-full border-none"
                    title="Design Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
