import HeroSlider from '@/components/HeroSlider';
import CategoriesGrid from '@/components/CategoriesGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeatureIcons from '@/components/FeatureIcons';
import RoomInspiration from '@/components/Roominspiration';
import DesignGallery from '@/components/DesignGallery';

export const metadata = {
  title: 'MarbleLux | Premium Stone Surfaces',
  description: 'Discover premium marble and stone surfaces for your home',
};

async function getSections() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/page-sections?page=home`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    const map: Record<string, boolean> = {};
    data.forEach((s: any) => {
      map[s.sectionId] = !!s.enabled;
    });
    return map;
  } catch {
    return { hero: true, categories: true, featured: true, features: true, inspiration: true, design: true };
  }
}

export default async function Home() {
  const enabled = await getSections();
  return (
    <div className="flex flex-col">
      {enabled.hero && <HeroSlider />}
      {enabled.categories && <CategoriesGrid />}
      {enabled.featured && <FeaturedProducts />}
      {enabled.features && <FeatureIcons />}
      {enabled.inspiration && (
        <div className="hidden lg:block">
          <RoomInspiration />
        </div>
      )}
      {enabled.design && <DesignGallery />}
    </div>
  );
}
