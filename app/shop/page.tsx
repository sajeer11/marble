'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

function ShopContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const perPage = 12;

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [currentPage, selectedCategory, search]);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString(),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(search && { search }),
      });

      const res = await fetch(`/api/products?${params}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
        setTotalProducts(data.pagination.total);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalProducts);

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-72 bg-[url('https://images.unsplash.com/photo-1565183938294-7563f3ce68c1?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
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
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center md:justify-start">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined">tune</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="h-10 text-sm border-none bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary pl-4 pr-10 rounded-lg"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
            <p className="text-sm">
              Showing {totalProducts === 0 ? 0 : startIndex}–{endIndex} of {totalProducts} results
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-icons text-6xl text-gray-400 mb-4">inventory_2</span>
            <p className="text-xl text-gray-600 dark:text-gray-400">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
