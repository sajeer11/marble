'use client';

import React, { useState, useEffect } from 'react';

const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-0 container mx-auto">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading categories...</div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-0 container mx-auto ">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Browse The Range
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
          Exquisite stone surfaces tailored for every need.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 place-items-center mr-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center group cursor-pointer w-full max-w-xs"
          >
            <div className="overflow-hidden rounded-xl mb-4 w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] transition-transform duration-500 group-hover:scale-105">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1565183938294-7563f3ce68c1?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
