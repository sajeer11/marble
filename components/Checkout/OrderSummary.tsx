import React from 'react';
import { CartItem } from '@/types';

interface Props {
  cart: CartItem[];
  cartTotal: number;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const OrderSummary: React.FC<Props> = ({ cart, cartTotal, paymentMethod, setPaymentMethod }) => {
  return (
    <div className="lg:pl-10">
      <div className="space-y-10">
        {/* Product List */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-4">
          <div className="flex justify-between items-center text-xl font-bold font-display dark:text-white">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{item.name}</span>
                <span className="text-xs font-bold dark:text-white">x {item.quantity}</span>
              </div>
              <span className="font-medium dark:text-white">
                Rp {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm dark:text-gray-300">Subtotal</span>
            <span className="font-medium dark:text-white">Rp {cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-sm dark:text-gray-300">Total</span>
            <span className="text-2xl font-bold text-primary font-display">
              Rp {cartTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-6">
          <PaymentOption
            method="bank-transfer"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
            description="Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
          />
          <PaymentOption
            method="cod"
            selected={paymentMethod}
            setSelected={setPaymentMethod}
            label="Cash On Delivery"
          />

          <p className="text-sm leading-relaxed dark:text-gray-300 py-4">
            Your personal data will be used to support your experience throughout this website,
            to manage access to your account, and for other purposes described in our{' '}
            <span className="font-bold cursor-pointer hover:underline">privacy policy</span>.
          </p>

          <div className="flex justify-center pt-6">
            <button className="w-full sm:w-80 h-16 border-2 border-black dark:border-white text-black dark:text-white rounded-xl font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all uppercase tracking-widest text-sm">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Option Subcomponent
interface PaymentProps {
  method: string;
  selected: string;
  setSelected: (val: string) => void;
  label?: string;
  description?: string;
}

const PaymentOption: React.FC<PaymentProps> = ({
  method,
  selected,
  setSelected,
  label,
  description,
}) => {
  const isActive = selected === method;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelected(method)}>
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all ${
            isActive
              ? 'bg-black dark:bg-white border-black dark:border-white'
              : 'border-gray-400'
          }`}
        ></div>
        <span
          className={`font-semibold text-sm ${
            isActive ? 'dark:text-white' : 'text-gray-400'
          }`}
        >
          {label || 'Direct Bank Transfer'}
        </span>
      </div>
      {isActive && description && (
        <p className="text-sm text-gray-400 leading-relaxed font-light mt-1">{description}</p>
      )}
    </div>
  );
};

export default OrderSummary;
