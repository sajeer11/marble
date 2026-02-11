import React from 'react';
import Link from 'next/link';

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-20 space-y-6">
      <span className="material-icons text-8xl text-gray-200">shopping_basket</span>
      <h2 className="text-3xl font-display font-bold dark:text-white">Your cart is empty</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link
        href="/shop"
        className="inline-block bg-primary text-white font-bold py-4 px-12 uppercase tracking-widest hover:bg-primary-dark transition-all"
      >
        Go to Shop
      </Link>
    </div>
  );
};

export default EmptyCart;
