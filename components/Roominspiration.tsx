
import React from 'react';

const RoomInspiration: React.FC = () => {
    return (
        <section className="bg-beige py-12 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/3 px-4 sm:px-6 md:pl-8 md:pr-10 mb-8 lg:mb-0 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-secondary mb-4">
                        50+ Beautiful rooms inspiration
                    </h2>
                        <p className="text-darkGray text-lg mb-6 md:mb-8 leading-relaxed max-w-full md:max-w-sm mx-auto lg:mx-0">
                        Our designer already made a lot of beautiful prototypes of rooms that inspire you.
                    </p>
                        <button className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 md:py-4 md:px-10 transition-all duration-300 shadow-md">
                        Explore More
                    </button>
                </div>
                    {/* Right Image Slider */}
                    <div className="w-full lg:w-2/3 flex gap-6 overflow-x-auto no-scrollbar pl-4 lg:pl-0">
                    {/* Active/Main Slide */}
                        <div className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[404px] h-[360px] sm:h-[482px] md:h-[582px]">
                        <img 
                            src="https://picsum.photos/id/445/800/1200" 
                            alt="Room Inspiration 1" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-md p-6 pr-12 min-w-[217px]">
                            <div className="flex items-center gap-2 text-darkGray text-sm mb-2">
                                <span>01</span>
                                <span className="w-6 h-[1px] bg-darkGray"></span>
                                <span>Bed Room</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-secondary">Inner Peace</h3>
                            <button className="absolute right-0 bottom-0 bg-primary p-3 text-white translate-x-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Secondary Slide */}
                    <div className="relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[372px] h-[280px] sm:h-[380px] md:h-[486px] self-start mt-0">
                        <img 
                            src="https://picsum.photos/id/352/800/1000" 
                            alt="Room Inspiration 2" 
                            className="w-full h-full object-cover"
                        />
                        <div className="flex gap-4 absolute -bottom-12">
                             <div className="w-3 h-3 rounded-full bg-primary border border-primary"></div>
                             <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                             <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                             <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                        </div>
                    </div>

                    {/* Third Slide (Visible on scroll/wide screens) */}
                    <div className="relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[372px] h-[280px] sm:h-[380px] md:h-[486px] self-start">
                        <img 
                            src="https://picsum.photos/id/164/800/1000" 
                            alt="Room Inspiration 3" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomInspiration;
