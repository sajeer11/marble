import React from 'react';

const CategoriesGrid: React.FC = () => {
  const categories = [
    {
      name: 'Dining',
      img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Living',
      img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Bedroom',
      img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-0 container mx-auto ">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Browse The Range
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
          Exquisite stone surfaces tailored for every need.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 place-items-center mr-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center group cursor-pointer w-full max-w-xs"
          >
            <div className="overflow-hidden rounded-xl mb-4 w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] transition-transform duration-500 group-hover:scale-105">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
