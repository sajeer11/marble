import React from 'react';

interface ContactBannerProps {
  title?: string;
  coverImage?: string;
}

const ContactBanner: React.FC<ContactBannerProps> = ({
  title = 'Contact Us',
  coverImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80'
}) => {
  return (
    <section className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-72 bg-cover bg-center flex items-center justify-center`} style={{ backgroundImage: `url(${coverImage})` }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative text-center">
        <span className="material-icons text-primary text-4xl mb-2">contact_support</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
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
