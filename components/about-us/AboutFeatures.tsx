import React from 'react';

const AboutFeatures: React.FC = () => {
  const features = [
    { icon: 'diamond', title: 'Premium Quality', desc: 'Sourced directly from renowned quarries.' },
    { icon: 'handyman', title: 'Handcrafted', desc: 'Finished by master stone artisans.' },
    { icon: 'verified_user', title: 'Warranty', desc: '10-year structural stone warranty.' },
    { icon: 'local_shipping', title: 'Free Delivery', desc: 'White-glove delivery on premium orders.' },
  ];

  return (
    <section className="py-24 bg-accent-beige dark:bg-surface-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-bold mb-4 dark:text-white">
            Why Choose MarbleLux?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We provide heirlooms that last generations. Here is what sets our craftsmanship apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-background-dark p-10 rounded-2xl shadow-soft flex flex-col items-center text-center group hover:scale-105 transition-all"
            >
              <span className="material-icons-outlined text-4xl text-primary mb-6">
                {f.icon}
              </span>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
