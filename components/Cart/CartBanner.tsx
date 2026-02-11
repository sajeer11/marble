import React from 'react';
import Link from 'next/link';

const CartBanner: React.FC = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-72 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Cart</h1>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Link href="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <span className="material-icons text-sm">chevron_right</span>
          <span className="font-light">Cart</span>
        </div>
      </div>
    </section>
  );
};

export default CartBanner;
