import ContactBanner from '@/components/Contact/ContactBanner';
import ContactIntro from '@/components/Contact/ContactIntro';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';
import ContactMap from '@/components/Contact/ContactMap';

export const metadata = {
  title: 'Contact Us | MarbleLux',
  description: 'Get in touch with MarbleLux for your marble and stone needs',
};

export default function Contact() {
  return (
    <div className="flex flex-col">
      <ContactBanner />
      <main className="container mx-auto px-6 py-20">
        <ContactIntro />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <ContactInfo />
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
        <ContactMap />
      </main>
    </div>
  );
}
