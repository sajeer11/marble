'use client';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

interface RoomSlide {
  id: number;
  image: string;
  label: string;
  type: string;
  title: string;
}

interface RoomInspirationProps {
  title?: string;
  description?: string;
}

const RoomInspiration: React.FC<RoomInspirationProps> = ({
  title = '50+ Beautiful rooms inspiration',
  description = 'Our designer already made a lot of beautiful prototypes of rooms that inspire you.',
}) => {
  const sliderRef = useRef<Slider>(null);

  const nextSlide = () => sliderRef.current?.slickNext();
  const prevSlide = () => sliderRef.current?.slickPrev();

  const slides: RoomSlide[] = [
    {
      id: 1,
      image: 'https://picsum.photos/id/445/800/1200',
      label: '01',
      type: 'Bed Room',
      title: 'Inner Peace',
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/352/800/1000',
      label: '02',
      type: 'Living Room',
      title: 'Cozy Corner',
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/164/800/1000',
      label: '03',
      type: 'Kitchen',
      title: 'Modern Style',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // custom arrows
    autoplay: false,
    adaptiveHeight: true,
  };

  return (
    <section className="bg-beige py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 px-4 sm:px-6 md:pl-8 md:pr-10 mb-8 lg:mb-0 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-secondary mb-4">
            {title}
          </h2>
          <p className="text-darkGray text-lg mb-6 md:mb-8 leading-relaxed max-w-full md:max-w-sm mx-auto lg:mx-0">
            {description}
          </p>
     <Link href="/shop">
  <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 md:py-4 md:px-10 transition-all duration-300 shadow-md">
    Explore More
  </button>
</Link>
          
        </div>

        {/* Right Slider */}
        <div className="w-full lg:w-2/3 relative">
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide) => (
              <div key={slide.id}>
                <div className="relative w-full h-[420px] sm:h-[520px] md:h-[582px] rounded-2xl overflow-hidden group transition-transform duration-500 hover:scale-105 shadow-md hover:shadow-xl">
                  <img
                    src={slide.image}
                    alt={`Room Inspiration ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-md p-6 pr-12 min-w-[217px]">
                    <div className="flex items-center gap-2 text-darkGray text-sm mb-2">
                      <span>{slide.label}</span>
                      <span className="w-6 h-[1px] bg-darkGray"></span>
                      <span>{slide.type}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-secondary">{slide.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary p-3 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-3 text-white rounded-full shadow-md z-10 hover:scale-110 transition-transform duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomInspiration;