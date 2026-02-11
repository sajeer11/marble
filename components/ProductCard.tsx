
'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '../app/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-[#F4F5F7] dark:bg-surface-dark relative overflow-hidden flex flex-col h-full rounded-md shadow-sm">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={product.image} 
        />
        {product.tag && (
          <div className={`absolute top-4 right-4 text-white text-xs font-bold px-2 py-2 rounded-full h-10 w-10 flex items-center justify-center ${
            product.tag.includes('-') ? 'bg-red-400' : 
            product.tag === 'New' ? 'bg-teal-400' : 'bg-primary'
          }`}>
            {product.tag}
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-4">
          <Link href={`/product/${product.id}`} className="bg-white text-primary font-bold py-2 px-6 sm:py-3 sm:px-10 hover:bg-primary hover:text-white transition-all w-full sm:w-3/4 text-center">
            View Details
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="bg-primary text-white font-bold py-2 px-6 sm:py-3 sm:px-10 hover:bg-primary-dark transition-all w-full sm:w-3/4 text-center"
          >
            Add to Cart
          </button>
          <div className="flex gap-4 text-white">
            <button className="flex items-center gap-1 hover:text-primary text-sm">
              <span className="material-icons-outlined text-base">share</span> Share
            </button>
            <button className="flex items-center gap-1 hover:text-primary text-sm">
              <span className="material-icons-outlined text-base">favorite_border</span> Like
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{product.category}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900 dark:text-white">Rp {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs font-light">Rp {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
