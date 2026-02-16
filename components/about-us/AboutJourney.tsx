import React from 'react';

interface AboutJourneyProps {
  subtitle?: string;
  title?: string;
  description?: string;
  coverImage?: string;
}

const AboutJourney: React.FC<AboutJourneyProps> = ({
  subtitle = 'Our Journey',
  title = 'Crafting Timeless Elegance Since 1995',
  description = 'MarbleLux began as a small family workshop in the heart of Carrara, Italy. Driven by a singular passion: to reveal the hidden beauty within raw stone. For nearly three decades, we have sourced the finest slabs from sustainable quarries around the world.',
  coverImage = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
}) => {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <img
            alt={title}
            className="rounded-2xl shadow-2xl relative z-10"
            src={coverImage}
          />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight dark:text-white">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-10 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
              <p className="text-sm font-medium text-gray-400 uppercase">Years of Expertise</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">15k</h3>
              <p className="text-sm font-medium text-gray-400 uppercase">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;
