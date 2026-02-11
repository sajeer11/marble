import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface Props {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<Props> = ({ relatedProducts }) => (
  <section className="mt-32">
    <h2 className="text-3xl font-display font-bold text-center mb-16 dark:text-white">
      Related Products
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {relatedProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
    <div className="text-center mt-12">
      <Link
        href="/shop"
        className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-16 transition-all"
      >
        Show More
      </Link>
    </div>
  </section>
);

export default RelatedProducts;
