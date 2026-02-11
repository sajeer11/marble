import React from 'react';
import Link from 'next/link';

interface Props {
  cartTotal: number;
}

const CartSummary: React.FC<Props> = ({ cartTotal }) => {
  return (
    <div className="bg-accent-beige dark:bg-surface-dark p-8 rounded-lg sticky top-32">
      <h2 className="text-2xl font-bold font-display text-center mb-8 dark:text-white">
        Cart Totals
      </h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm">Subtotal</span>
          <span className="text-gray-500 dark:text-gray-400">
            Rp {cartTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm">Total</span>
          <span className="text-primary text-xl font-bold">
            Rp {cartTotal.toLocaleString()}
          </span>
        </div>

        <Link
          href="/checkout"
          className="block text-center w-full border-2 border-black dark:border-white py-4 rounded-xl font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all mt-8 uppercase tracking-widest text-sm"
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
