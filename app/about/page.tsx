import AboutHero from '@/components/about-us/AboutHero';
import AboutJourney from '@/components/about-us/AboutJourney';
import AboutFeatures from '@/components/about-us/AboutFeatures';

export const metadata = {
  title: 'About Us | MarbleLux',
  description: 'Learn about MarbleLux and our premium stone surfaces',
};

async function getSections() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/page-sections?page=about`, { cache: 'no-store' });
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
      journey: { enabled: true },
      features: { enabled: true }
    };
  }
}

export default async function About() {
  const sections = await getSections();

  return (
    <div className="flex flex-col">
      {sections.hero?.enabled && (
        <AboutHero
          title={sections.hero.title}
          coverImage={sections.hero.coverImage}
        />
      )}
      {sections.journey?.enabled && (
        <AboutJourney
          title={sections.journey.title}
          description={sections.journey.description}
          coverImage={sections.journey.coverImage}
          subtitle={sections.journey.subtitle}
        />
      )}
      {sections.features?.enabled && (
        <AboutFeatures
          title={sections.features.title}
          description={sections.features.description}
        />
      )}
    </div>
  );
}
