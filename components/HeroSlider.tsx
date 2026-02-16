'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_SLIDES = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt2UJdADwfRgHqnjFdntkgurSQPyd-e_YiA8kY52E0sxlnEdyUwsT6Zofs-KqXQXu5Ug8YlhTY9jIC5GHM_hUkuqcPY6E-61LX1mvjjlUNFJWM6yuU5SmjsKI49i_tuG8pCuHfdtUVu46LjH2cQ1NP-pxPB41LU8cD3VSrn_D8Ap5ztz68Z-RNTmSp-BsfiXDtEBruMLf98qoC2EDbo9Fu0MlWpr42-RYK3nStGrbHJKfCURlcyTm5eCVAuxqe6-odcW6GPED8eEY',
    title: 'Discover Our New Collection',
    description: 'Elevate your spaces with our premium selection of imported marble. Timeless elegance tailored for every vision.',
    tag: 'New Arrival',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec86d26?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Marble Selection',
    description: 'Transform your home with luxury Italian marble finishes. Explore our exclusive collection of premium natural stones.',
    tag: 'Best Seller',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
    title: 'Timeless Elegance',
    description: 'Create stunning interiors with our curated selection of marble and stone surfaces. Quality crafted for perfection.',
    tag: 'Exclusive',
  },
];

interface HeroSlide {
  id: number | string;
  image: string;
  title: string;
  description: string;
  tag?: string;
}

interface HeroSliderProps {
  slides?: HeroSlide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides = DEFAULT_SLIDES }) => {
  const currentSlides = slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  };

  const currentSlideData = currentSlides[currentSlide];

  return (
    <section className="relative w-full h-[420px] sm:h-[520px] md:h-[720px] overflow-hidden">
      {/* Slide Container */}
      <div className="relative w-full h-full">
        {currentSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              alt={slide.title}
              className="w-full h-full object-cover"
              src={slide.image}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-8 md:px-12">
        <div className="relative z-10 flex justify-center sm:justify-end bg-[#f7ead8] ">
          <div className="bg-accent-beige/95 dark:bg-surface-dark/95 backdrop-blur-sm p-6 sm:p-10 md:p-14 rounded-lg max-w-full sm:max-w-md md:max-w-lg shadow-xl animate-fade-in-up">
            <span className="text-gray-600 dark:text-gray-300 font-semibold tracking-widest text-sm uppercase mb-3 block">
              {currentSlideData.tag}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-10 leading-relaxed text-base">
              {currentSlideData.description}
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 sm:py-4 sm:px-10 uppercase text-sm tracking-widest transition-all duration-300 shadow-md"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
        aria-label="Previous slide"
      >
        <span className="material-icons text-2xl sm:text-3xl">chevron_left</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
        aria-label="Next slide"
      >
        <span className="material-icons text-2xl sm:text-3xl">chevron_right</span>
      </button>

      {/* Dots Indicator */}
      {currentSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full">
          {currentSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'bg-white h-3 w-8 shadow-lg'
                  : 'bg-white/60 hover:bg-white/90 h-2 w-2'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
