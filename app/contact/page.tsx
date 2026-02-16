import ContactBanner from '@/components/Contact/ContactBanner';
import ContactIntro from '@/components/Contact/ContactIntro';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';
import ContactMap from '@/components/Contact/ContactMap';

export const metadata = {
  title: 'Contact Us | MarbleLux',
  description: 'Get in touch with MarbleLux for your marble and stone needs',
};

async function getSections() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/page-sections?page=contact`, { cache: 'no-store' });
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
      banner: { enabled: true },
      intro: { enabled: true },
      info: { enabled: true },
      form: { enabled: true },
      map: { enabled: true }
    };
  }
}

export default async function Contact() {
  const sections = await getSections();

  return (
    <div className="flex flex-col">
      {sections.banner?.enabled && (
        <ContactBanner
          title={sections.banner.title}
          coverImage={sections.banner.coverImage}
        />
      )}
      <section className="py-24 container mx-auto px-6">
        {sections.intro?.enabled && (
          <ContactIntro
            title={sections.intro.title}
            description={sections.intro.description}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {sections.info?.enabled && (
            <ContactInfo
              infoItems={[
                { icon: 'location_on', title: 'Address', desc: sections.info.address || '236 5th SE Avenue, New York NY10000, United States' },
                { icon: 'phone', title: 'Phone', desc: sections.info.phone || 'Mobile: +(84) 546-6789' },
                { icon: 'access_time', title: 'Working Time', desc: sections.info.hours || 'Monday-Friday: 9:00 - 22:00' },
                { icon: 'mail', title: 'Email Address', desc: sections.info.email || 'info@marblelux.com' }
              ]}
            />
          )}
          {sections.form?.enabled && <ContactForm />}
        </div>
      </section>
      {sections.map?.enabled && <ContactMap />}
    </div>
  );
}
