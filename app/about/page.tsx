import AboutHero from '@/components/about-us/AboutHero';
import AboutJourney from '@/components/about-us/AboutJourney';
import AboutFeatures from '@/components/about-us/AboutFeatures';

export const metadata = {
  title: 'About Us | MarbleLux',
  description: 'Learn about MarbleLux and our premium stone surfaces',
};

export default function About() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutJourney />
      <AboutFeatures />
    </div>
  );
}
