'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    const interval = setInterval(loadProducts, 3000); // Refresh every 3 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-20 bg-white dark:bg-background-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Products
          </h2>
          <div className="text-center text-gray-600 dark:text-gray-400">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mr-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 sm:py-3 sm:px-16 transition-colors duration-300"
          >
            Show More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
