'use client';

import { useState } from 'react';
import { useCart } from '@/app/CartContext';
import CheckoutBanner from '@/components/Checkout/CheckoutBanner';
import BillingDetailsForm from '@/components/Checkout/BillingDetailsForm';
import OrderSummary from '@/components/Checkout/OrderSummary';
import FeatureRow from '@/components/Checkout/FeatureRow';

export default function Checkout() {
  const { cart, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  return (
    <div className="flex flex-col">
      <CheckoutBanner />

      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <BillingDetailsForm />
          <OrderSummary
            cart={cart}
            cartTotal={cartTotal}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </main>

      <FeatureRow />
    </div>
  );
}
