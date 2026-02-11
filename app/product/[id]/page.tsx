'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/constants';
import { useCart } from '@/app/CartContext';
import ProductBreadcrumb from '@/components/ProductBreadcrumb';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const product = PRODUCTS.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <Link href="/shop" className="text-primary mt-4 inline-block hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== params.id).slice(0, 4);

  return (
    <div className="flex flex-col">
      <ProductBreadcrumb product={product} />

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGallery image={product.image} tag={product.tag} />
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
          />
        </div>

        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <RelatedProducts relatedProducts={relatedProducts} />
      </main>
    </div>
  );
}
