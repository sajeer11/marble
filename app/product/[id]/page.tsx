'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/app/CartContext';
import ProductBreadcrumb from '@/components/ProductBreadcrumb';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';
import ReviewsSection from '@/components/ReviewsSection';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { user } = useUserAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch {
        setProduct(null);
      }
      try {
        const rel = await fetch(`/api/products?limit=4`);
        if (rel.ok) {
          const data = await rel.json();
          setRelated(data.products?.filter((p: any) => String(p.id) !== String(id))?.slice(0, 4) || []);
        }
      } catch {
        setRelated([]);
      }
    };
    load();
  }, [id]);

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

  return (
    <div className="flex flex-col">
      <ProductBreadcrumb product={{ ...product, id: String(product.id) }} />
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGallery image={product.image} tag={product.tag} />
          <ProductInfo
            product={{ ...product, id: String(product.id) }}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
          />
        </div>
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <RelatedProducts relatedProducts={related} />
        <ReviewsSection productId={parseInt(id)} userId={typeof user?.id === 'string' ? parseInt(user.id) : user?.id} />
      </main>
    </div>
  );
}
