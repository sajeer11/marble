import React from 'react';

const ContactBanner: React.FC = () => {
  return (
    <section className="relative h-72 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative text-center">
        <span className="material-icons text-primary text-4xl mb-2">contact_support</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="font-medium">Home</span>
          <span className="material-icons text-sm">chevron_right</span>
          <span className="font-light">Contact</span>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
