
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative h-72 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Cart</h1>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-light">Cart</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20">
        {cart.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <span className="material-icons text-8xl text-gray-200">shopping_basket</span>
            <h2 className="text-3xl font-display font-bold dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="inline-block bg-primary text-white font-bold py-4 px-12 uppercase tracking-widest hover:bg-primary-dark transition-all">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
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
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors">
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                          <span className="font-medium dark:text-white">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-gray-500 dark:text-gray-400">
                        Rp {item.price.toLocaleString()}
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded h-10 w-24 mx-auto bg-white dark:bg-surface-dark">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 text-gray-400 hover:text-primary">-</button>
                          <span className="flex-1 text-center text-sm font-medium dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 text-gray-400 hover:text-primary">+</button>
                        </div>
                      </td>
                      <td className="py-6 px-6 font-medium dark:text-white">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-6 px-6 text-right">
                        <button onClick={() => removeFromCart(item.id)} className="text-primary hover:text-primary-dark transition-colors">
                          <span className="material-icons-outlined">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-accent-beige dark:bg-surface-dark p-8 rounded-lg sticky top-32">
                <h2 className="text-2xl font-bold font-display text-center mb-8 dark:text-white">Cart Totals</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Subtotal</span>
                    <span className="text-gray-500 dark:text-gray-400">Rp {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Total</span>
                    <span className="text-primary text-xl font-bold">Rp {cartTotal.toLocaleString()}</span>
                  </div>
                  <Link 
                    to="/checkout"
                    className="block text-center w-full border-2 border-black dark:border-white py-4 rounded-xl font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all mt-8 uppercase tracking-widest text-sm"
                  >
                    Check Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Row */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8 py-20 bg-accent-beige dark:bg-surface-dark px-12 -mx-6 md:-mx-12 lg:-mx-20">
          {[
            { icon: 'emoji_events', title: 'High Quality', desc: 'crafted from top materials' },
            { icon: 'verified_user', title: 'Warranty Protection', desc: 'Over 2 years' },
            { icon: 'local_shipping', title: 'Free Shipping', desc: 'Order over 150 $' },
            { icon: 'support_agent', title: '24 / 7 Support', desc: 'Dedicated support' }
          ].map((f) => (
            <div key={f.title} className="flex items-center space-x-4">
              <span className="material-icons text-5xl text-gray-900 dark:text-white">{f.icon}</span>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{f.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Cart;
