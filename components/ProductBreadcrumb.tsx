import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';

interface Props {
  product: Product;
}

const ProductBreadcrumb: React.FC<Props> = ({ product }) => (
  <div className="bg-accent-beige dark:bg-surface-dark py-6 mb-8">
    <div className="container mx-auto px-6 flex items-center space-x-3 text-sm">
      <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
        Home
      </Link>
      <span className="material-icons text-base">chevron_right</span>
      <Link to="/shop" className="text-gray-500 hover:text-primary transition-colors">
        Shop
      </Link>
      <span className="material-icons text-base">chevron_right</span>
      <span className="px-2 border-l-2 border-gray-400 font-medium dark:text-white">
        {product.name}
      </span>
    </div>
  </div>
);

export default ProductBreadcrumb;
