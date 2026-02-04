import React from 'react';
import AboutHero from '@/components/about-us/AboutHero';
import AboutJourney from '@/components/about-us/AboutJourney';
import AboutFeatures from '@/components/about-us/AboutFeatures';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutJourney />
      <AboutFeatures />
    </div>
  );
};

export default About;
