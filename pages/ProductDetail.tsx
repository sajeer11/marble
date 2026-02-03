
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { useCart } from '../CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.id !== id).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-accent-beige dark:bg-surface-dark py-6 mb-8">
        <div className="container mx-auto px-6 flex items-center space-x-3 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
          <span className="material-icons text-base">chevron_right</span>
          <Link to="/shop" className="text-gray-500 hover:text-primary transition-colors">Shop</Link>
          <span className="material-icons text-base">chevron_right</span>
          <span className="px-2 border-l-2 border-gray-400 font-medium dark:text-white">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-20 h-20 md:w-24 md:h-24 bg-accent-beige dark:bg-surface-dark rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${i === 1 ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 bg-accent-beige dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm relative group">
              <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
              {product.tag && (
                <div className="absolute top-4 right-4 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-2xl text-gray-500 dark:text-gray-400 font-light">Rp {product.price.toLocaleString()} / m²</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-icons text-base">star</span>)}
              </div>
              <span className="border-l border-gray-200 pl-4">5 Customer Reviews</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description} Sourced from the finest quarries, our collection represents the pinnacle of craftsmanship. Each slab is unique, bringing nature's art into your curated living spaces.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Finish</span>
                <div className="flex space-x-3">
                  {['Polished', 'Honed', 'Leathered'].map(f => (
                    <button key={f} className={`px-5 py-2 rounded text-sm transition-all ${f === 'Polished' ? 'bg-primary text-white' : 'bg-accent-beige dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{f}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded px-6 py-3 justify-between bg-white dark:bg-surface-dark w-full sm:w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-primary">-</button>
                <span className="font-medium text-lg dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-primary">+</button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-white border-2 border-black dark:border-white text-black dark:text-white rounded py-3 font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Add To Cart
              </button>
              <button className="flex-1 bg-white border-2 border-black dark:border-white text-black dark:text-white rounded py-3 font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                + Compare
              </button>
            </div>

            <hr className="border-gray-100 dark:border-gray-800 my-4" />
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex"><span className="w-24">SKU</span><span>: ML-{product.id.padStart(3, '0')}</span></div>
              <div className="flex"><span className="w-24">Category</span><span>: {product.category}</span></div>
              <div className="flex"><span className="w-24">Tags</span><span>: Luxury, Architectural, Premium</span></div>
              <div className="flex pt-2 space-x-4">
                <span className="w-24">Share</span>
                <div className="flex space-x-4 text-gray-900 dark:text-white">
                  <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">facebook</span>
                  <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">language</span>
                  <span className="material-icons-outlined text-lg cursor-pointer hover:text-primary">alternate_email</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-24 border-t border-gray-100 dark:border-gray-800 pt-12">
          <div className="flex justify-center space-x-12 mb-12 text-lg font-medium">
            {['description', 'additional information', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize transition-all border-b-2 ${activeTab === tab ? 'text-black dark:text-white border-black dark:border-white' : 'text-gray-400 border-transparent hover:text-black'}`}
              >
                {tab} {tab === 'reviews' && '[5]'}
              </button>
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-gray-500 dark:text-gray-400 leading-relaxed text-justify space-y-6">
            <p>
              Statuario marble is a striking and exclusive stone, characterized by its distinct gray and gold veining throughout and a striking, bold pattern. This marble is perfect for making a statement in any area. It is widely used for countertops and vanities, as well as floor and wall tiles. The unique patterns created by nature make every piece of Statuario marble a one-of-a-kind masterpiece.
            </p>
            <p>
              Weighing approximately 2800 kg/m³, this dense natural stone offers excellent durability when properly sealed. Regular maintenance ensures its luster remains for decades. Sourced directly from the Apuan Alps in northern Tuscany, our Statuario Gold selection represents the pinnacle of Italian stone craftsmanship.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-32">
          <h2 className="text-3xl font-display font-bold text-center mb-16 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop" className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-16 transition-all">Show More</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;
