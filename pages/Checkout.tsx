
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="relative h-72 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Checkout</h1>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
            <span className="material-icons text-sm">chevron_right</span>
            <span className="font-light">Checkout</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Billing Details Form */}
          <div className="space-y-10">
            <h2 className="text-3xl font-bold font-display dark:text-white">Billing details</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold dark:text-gray-200">First Name</label>
                  <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold dark:text-gray-200">Last Name</label>
                  <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Company Name (Optional)</label>
                <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Country / Region</label>
                <select className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all">
                  <option>Indonesia</option>
                  <option>United States</option>
                  <option>Italy</option>
                  <option>Brazil</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Street address</label>
                <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Town / City</label>
                <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Province</label>
                <select className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all">
                  <option>Western Indonesia</option>
                  <option>Central Java</option>
                  <option>East Java</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">ZIP code</label>
                <input type="text" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Phone</label>
                <input type="tel" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-200">Email address</label>
                <input type="email" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all" />
              </div>

              <div className="pt-4">
                <input type="text" placeholder="Additional information" className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all px-4" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-10">
            <div className="space-y-10">
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
                    <span className="font-medium dark:text-white">Rp {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm dark:text-gray-300">Subtotal</span>
                  <span className="font-medium dark:text-white">Rp {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm dark:text-gray-300">Total</span>
                  <span className="text-2xl font-bold text-primary font-display">Rp {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      onClick={() => setPaymentMethod('bank-transfer')}
                      className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${paymentMethod === 'bank-transfer' ? 'bg-black dark:bg-white border-black dark:border-white' : 'border-gray-400'}`}
                    ></div>
                    <span className={`font-semibold text-sm ${paymentMethod === 'bank-transfer' ? 'dark:text-white' : 'text-gray-400'}`}>Direct Bank Transfer</span>
                  </div>
                  {paymentMethod === 'bank-transfer' && (
                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div 
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-black dark:bg-white border-black dark:border-white' : 'border-gray-400'}`}
                    ></div>
                    <span className={`font-semibold text-sm ${paymentMethod === 'cod' ? 'dark:text-white' : 'text-gray-400'}`}>Cash On Delivery</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed dark:text-gray-300 py-4">
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-bold cursor-pointer hover:underline">privacy policy</span>.
                </p>

                <div className="flex justify-center pt-6">
                  <button className="w-full sm:w-80 h-16 border-2 border-black dark:border-white text-black dark:text-white rounded-xl font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all uppercase tracking-widest text-sm">
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Features */}
      <section className="bg-accent-beige dark:bg-surface-dark py-20 mt-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
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
        </div>
      </section>
    </div>
  );
};

export default Checkout;
