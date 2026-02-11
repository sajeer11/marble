import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[420px] sm:h-[520px] md:h-[720px] bg-accent-beige dark:bg-surface-dark overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          alt="Luxury Marble Interior"
          className="w-full h-full object-cover opacity-80  "
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt2UJdADwfRgHqnjFdntkgurSQPyd-e_YiA8kY52E0sxlnEdyUwsT6Zofs-KqXQXu5Ug8YlhTY9jIC5GHM_hUkuqcPY6E-61LX1mvjjlUNFJWM6yuU5SmjsKI49i_tuG8pCuHfdtUVu46LjH2cQ1NP-pxPB41LU8cD3VSrn_D8Ap5ztz68Z-RNTmSp-BsfiXDtEBruMLf98qoC2EDbo9Fu0MlWpr42-RYK3nStGrbHJKfCURlcyTm5eCVAuxqe6-odcW6GPED8eEY"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex justify-center sm:justify-end mr-8">
        <div className="bg-accent-beige/95 dark:bg-surface-dark/95 backdrop-blur-sm p-6 sm:p-10 md:p-14 rounded-lg max-w-full sm:max-w-md md:max-w-lg shadow-xl animate-fade-in-up">
          <span className="text-gray-600 dark:text-gray-300 font-semibold tracking-widest text-sm uppercase mb-3 block">
            New Arrival
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
            Discover Our <br />New Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-10 leading-relaxed text-base">
            Elevate your spaces with our premium selection of imported marble. Timeless elegance tailored for every vision.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 sm:py-4 sm:px-10 uppercase text-sm tracking-widest transition-all duration-300 shadow-md"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
