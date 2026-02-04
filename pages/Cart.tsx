import React from 'react';
import { useCart } from '@/CartContext';
import CartBanner from '@/components/Cart/CartBanner';
import EmptyCart from '@/components/Cart/EmptyCart';
import CartTable from '@/components/Cart/CartTable';
import CartSummary from '@/components/Cart/CartSummary';
import FeatureRow from '@/components/Cart/FeatureRow';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="flex flex-col">
      <CartBanner />

      <main className="container mx-auto px-6 py-20">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 overflow-x-auto">
              <CartTable
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </div>

            <div className="lg:col-span-1">
              <CartSummary cartTotal={cartTotal} />
            </div>
          </div>
        )}

        <FeatureRow />
      </main>
    </div>
  );
};

export default Cart;
