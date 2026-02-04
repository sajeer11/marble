import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="relative h-96 bg-accent-beige dark:bg-surface-dark flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1600585152915-d208bec86d26?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover"
          alt="About MarbleLux"
        />
      </div>
      <span className="material-icons-outlined text-primary text-5xl mb-4 relative z-10">
        terrain
      </span>
      <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white relative z-10">
        About Us
      </h1>
      <div className="flex items-center space-x-2 text-sm mt-4 relative z-10">
        <span className="font-bold">Home</span>
        <span className="material-icons text-sm">chevron_right</span>
        <span className="font-light">About</span>
      </div>
    </section>
  );
};

export default AboutHero;
