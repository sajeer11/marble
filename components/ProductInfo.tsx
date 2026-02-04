import React from 'react';
import { Product } from '@/types';

interface Props {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (product: Product, quantity: number) => void;
}

const ProductInfo: React.FC<Props> = ({ product, quantity, setQuantity, addToCart }) => {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>
        <p className="text-2xl text-gray-500 dark:text-gray-400 font-light">
          Rp {product.price.toLocaleString()} / m²
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="material-icons text-base">
              star
            </span>
          ))}
        </div>
        <span className="border-l border-gray-200 pl-4">5 Customer Reviews</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {product.description} Sourced from the finest quarries, our collection represents the pinnacle of craftsmanship.
      </p>

      {/* Finish Options */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Finish
          </span>
          <div className="flex space-x-3">
            {['Polished', 'Honed', 'Leathered'].map((f) => (
              <button
                key={f}
                className={`px-5 py-2 rounded text-sm transition-all ${
                  f === 'Polished'
                    ? 'bg-primary text-white'
                    : 'bg-accent-beige dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity + Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded px-6 py-3 justify-between bg-white dark:bg-surface-dark w-full sm:w-32">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-gray-400 hover:text-primary"
          >
            -
          </button>
          <span className="font-medium text-lg dark:text-white">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-gray-400 hover:text-primary"
          >
            +
          </button>
        </div>
        <button
          onClick={() => addToCart(product, quantity)}
          className="flex-1 bg-white border-2 border-black dark:border-white text-black dark:text-white rounded py-3 font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          Add To Cart
        </button>
        <button className="flex-1 bg-white border-2 border-black dark:border-white text-black dark:text-white rounded py-3 font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
          + Compare
        </button>
      </div>

      <hr className="border-gray-100 dark:border-gray-800 my-4" />

      {/* Meta Info */}
      <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex">
          <span className="w-24">SKU</span>
          <span>: ML-{product.id.padStart(3, '0')}</span>
        </div>
        <div className="flex">
          <span className="w-24">Category</span>
          <span>: {product.category}</span>
        </div>
        <div className="flex">
          <span className="w-24">Tags</span>
          <span>: Luxury, Architectural, Premium</span>
        </div>
        <div className="flex pt-2 space-x-4">
          <span className="w-24">Share</span>
          <div className="flex space-x-4 text-gray-900 dark:text-white">
            <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">
              facebook
            </span>
            <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">
              language
            </span>
            <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">
              alternate_email
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
