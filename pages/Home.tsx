
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { RangeCategory } from '@/types';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[720px] bg-accent-beige dark:bg-surface-dark overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Luxury Marble Interior" 
            className="w-full h-full object-cover opacity-80" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt2UJdADwfRgHqnjFdntkgurSQPyd-e_YiA8kY52E0sxlnEdyUwsT6Zofs-KqXQXu5Ug8YlhTY9jIC5GHM_hUkuqcPY6E-61LX1mvjjlUNFJWM6yuU5SmjsKI49i_tuG8pCuHfdtUVu46LjH2cQ1NP-pxPB41LU8cD3VSrn_D8Ap5ztz68Z-RNTmSp-BsfiXDtEBruMLf98qoC2EDbo9Fu0MlWpr42-RYK3nStGrbHJKfCURlcyTm5eCVAuxqe6-odcW6GPED8eEY" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 flex justify-end">
          <div className="bg-accent-beige/95 dark:bg-surface-dark/95 backdrop-blur-sm p-10 md:p-14 rounded-lg max-w-lg shadow-xl animate-fade-in-up">
            <span className="text-gray-600 dark:text-gray-300 font-semibold tracking-widest text-sm uppercase mb-3 block">New Arrival</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">Discover Our <br />New Collection</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-base">
              Elevate your spaces with our premium selection of imported marble. Timeless elegance tailored for every vision.
            </p>
            <Link to="/shop" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 uppercase text-sm tracking-widest transition-all duration-300 shadow-md">
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Browse The Range</h2>
          <p className="text-gray-500 dark:text-gray-400">Exquisite stone surfaces tailored for every need.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Dining', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80' },
            { name: 'Living', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80' },
            { name: 'Bedroom', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80' }
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 w-full h-[480px]">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-12">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop" className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-16 transition-colors duration-300">
              Show More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="bg-accent-beige dark:bg-surface-dark py-20">
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

export default Home;
