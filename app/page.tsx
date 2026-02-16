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
    const map: Record<string, any> = {};
    data.forEach((s: any) => {
      map[s.sectionId] = {
        enabled: !!s.enabled,
        title: s.title,
        description: s.description,
        coverImage: s.coverImage,
        ...s.settings
      };
    });
    return map;
  } catch {
    return {
      hero: { enabled: true },
      categories: { enabled: true },
      featured: { enabled: true },
      features: { enabled: true },
      inspiration: { enabled: true },
      design: { enabled: true }
    };
  }
}

export default async function Home() {
  const sections = await getSections();

  return (
    <div className="flex flex-col">
      {sections.hero?.enabled && (
        <HeroSlider slides={sections.hero.slides} />
      )}

      {sections.categories?.enabled && (
        <CategoriesGrid
          title={sections.categories.title}
          description={sections.categories.description}
        />
      )}

      {sections.featured?.enabled && (
        <FeaturedProducts title={sections.featured.title} />
      )}

      {sections.features?.enabled && (
        <FeatureIcons features={sections.features.features} />
      )}

      {sections.inspiration?.enabled && (
        <div className="hidden lg:block">
          <RoomInspiration
            title={sections.inspiration.title}
            description={sections.inspiration.description}
          />
        </div>
      )}

      {sections.design?.enabled && (
        <DesignGallery
          title={sections.design.title}
          subtitle={sections.design.subtitle}
        />
      )}
    </div>
  );
}
