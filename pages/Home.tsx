import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeatureIcons from '@/components/FeatureIcons';
import RoomInspiration from '@/components/Roominspiration';
import DesignGallery from '@/components/DesignGallery';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoriesGrid />
      <FeaturedProducts />
      <FeatureIcons />

      {/* Show RoomInspiration only on laptop/desktop */}
      <div className="hidden lg:block">
        <RoomInspiration />
      </div>

      <DesignGallery /> 
    </div>
  );
};

export default Home;
