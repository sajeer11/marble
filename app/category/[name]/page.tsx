'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/constants';

export default function CategoryPage({ params }: any) {
  const [filter, setFilter] = useState('All');
  
  const categoryName = decodeURIComponent(params.name);
  const filteredProducts = PRODUCTS.filter(p => 
    p.category.toLowerCase().includes(categoryName.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-72 bg-[url('https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">{categoryName}</h1>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="font-medium">Home</span>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-medium">Shop</span>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-light capitalize">{categoryName}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-24">
        {/* Toolbar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">{categoryName}</h2>
              <p className="text-gray-600 dark:text-gray-400">Showing {filteredProducts.length} products</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by</span>
                <select className="h-10 text-sm border-none bg-white dark:bg-surface-dark focus:ring-1 focus:ring-primary pl-4 pr-10 rounded">
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-icons text-6xl text-gray-400">shopping_bag</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
