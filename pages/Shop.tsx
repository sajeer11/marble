
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';

const Shop: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category.includes(filter));

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative h-72 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop</h1>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="font-medium">Home</span>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-light">Shop</span>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="bg-accent-beige dark:bg-surface-dark py-6 mb-12 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
              <span className="material-icons-outlined">tune</span> Filter
            </button>
            <div className="flex gap-4">
              <button className="material-icons-outlined text-primary">grid_view</button>
              <button className="material-icons-outlined text-gray-400">view_list</button>
            </div>
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <p className="text-sm">Showing 1–{filteredProducts.length} of {filteredProducts.length} results</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <input type="text" value="16" className="w-12 h-10 text-center text-sm border-none bg-white dark:bg-surface-dark focus:ring-1 focus:ring-primary" readOnly />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by</span>
              <select className="h-10 text-sm border-none bg-white dark:bg-surface-dark focus:ring-1 focus:ring-primary pl-4 pr-10">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-4">
          <button className="w-12 h-12 flex items-center justify-center rounded bg-primary text-white font-medium">1</button>
          <button className="w-12 h-12 flex items-center justify-center rounded bg-accent-beige dark:bg-surface-dark hover:bg-primary hover:text-white transition-colors">2</button>
          <button className="w-12 h-12 flex items-center justify-center rounded bg-accent-beige dark:bg-surface-dark hover:bg-primary hover:text-white transition-colors">3</button>
          <button className="w-20 h-12 flex items-center justify-center rounded bg-accent-beige dark:bg-surface-dark hover:bg-primary hover:text-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
