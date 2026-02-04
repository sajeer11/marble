import React from 'react';

const FeatureRow: React.FC = () => {
  const features = [
    { icon: 'emoji_events', title: 'High Quality', desc: 'crafted from top materials' },
    { icon: 'verified_user', title: 'Warranty Protection', desc: 'Over 2 years' },
    { icon: 'local_shipping', title: 'Free Shipping', desc: 'Order over 150 $' },
    { icon: 'support_agent', title: '24 / 7 Support', desc: 'Dedicated support' },
  ];

  return (
    <section className="bg-accent-beige dark:bg-surface-dark py-20 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="flex items-center space-x-4">
            <span className="material-icons text-5xl text-gray-900 dark:text-white">{f.icon}</span>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{f.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureRow;
