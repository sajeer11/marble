
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative h-96 bg-accent-beige dark:bg-surface-dark flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1600585152915-d208bec86d26?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" />
        </div>
        <span className="material-icons-outlined text-primary text-5xl mb-4 relative z-10">terrain</span>
        <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white relative z-10">About Us</h1>
        <div className="flex items-center space-x-2 text-sm mt-4 relative z-10">
          <span className="font-bold">Home</span>
          <span className="material-icons text-sm">chevron_right</span>
          <span className="font-light">About</span>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              alt="Marble Workshop" 
              className="rounded-2xl shadow-2xl relative z-10" 
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80" 
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
          </div>
          <div className="space-y-8">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight dark:text-white">Crafting Timeless Elegance Since 1995</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              MarbleLux began as a small family workshop in the heart of Carrara, Italy. Driven by a singular passion: to reveal the hidden beauty within raw stone. For nearly three decades, we have sourced the finest slabs from sustainable quarries around the world.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              We believe every vein tells a unique story. Whether it's a statement kitchen island or a delicate bathroom vanity, our artisans treat each piece with the reverence it deserves.
            </p>
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

      {/* Features Grid */}
      <section className="py-24 bg-accent-beige dark:bg-surface-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4 dark:text-white">Why Choose MarbleLux?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">We provide heirlooms that last generations. Here is what sets our craftsmanship apart.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: 'diamond', title: 'Premium Quality', desc: 'Sourced directly from renowned quarries.' },
              { icon: 'handyman', title: 'Handcrafted', desc: 'Finished by master stone artisans.' },
              { icon: 'verified_user', title: 'Warranty', desc: '10-year structural stone warranty.' },
              { icon: 'local_shipping', title: 'Free Delivery', desc: 'White-glove delivery on premium orders.' }
            ].map((f) => (
              <div key={f.title} className="bg-white dark:bg-background-dark p-10 rounded-2xl shadow-soft flex flex-col items-center text-center group hover:scale-105 transition-all">
                <span className="material-icons-outlined text-4xl text-primary mb-6">{f.icon}</span>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
