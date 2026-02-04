import React from 'react';
import { CartItem } from '@/types';

interface Props {
  cart: CartItem[];
  removeFromCart: (id: string) => void; 
  updateQuantity: (id: string, qty: number) => void;
}

const CartTable: React.FC<Props> = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <>
      {/* Desktop/tablet table */}
      <div className="hidden sm:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent-beige dark:bg-surface-dark">
              <th className="py-4 px-6 font-semibold">Product</th>
              <th className="py-4 px-6 font-semibold">Price</th>
              <th className="py-4 px-6 font-semibold text-center">Quantity</th>
              <th className="py-4 px-6 font-semibold">Subtotal</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {cart.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors"
              >
                <td className="py-6 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                    />
                    <span className="font-medium dark:text-white">{item.name}</span>
                  </div>
                </td>

                <td className="py-6 px-6 text-gray-500 dark:text-gray-400">
                  Rp {item.price.toLocaleString()}
                </td>

                <td className="py-6 px-6">
                  <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded h-10 w-24 mx-auto bg-white dark:bg-surface-dark">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex-1 text-gray-400 hover:text-primary"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-medium dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex-1 text-gray-400 hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="py-6 px-6 font-medium dark:text-white">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </td>

                <td className="py-6 px-6 text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <span className="material-icons-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 sm:hidden">
        {cart.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 dark:border-gray-800 rounded-lg p-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <button onClick={() => removeFromCart(item.id)} className="text-primary hover:text-primary-dark">
                  <span className="material-icons-outlined">delete</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Rp {item.price.toLocaleString()}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded h-8">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 text-gray-400">-</button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 text-gray-400">+</button>
                </div>
                <div className="ml-auto font-medium">Rp {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartTable;
