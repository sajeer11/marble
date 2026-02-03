
import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const SocialGallery: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-gray-600 font-medium">Share your setup with</p>
        <h2 className="text-3xl font-display font-bold text-gray-900">#MarbluxDesigns</h2>
      </div>
      
      {/* Masonry-like grid using basic Tailwind grid with varying spans/alignments to match mockup */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 h-auto md:h-[600px] px-4 max-w-[1440px] mx-auto">
        {/* Col 1 */}
        <div className="col-span-1 flex flex-col justify-end gap-4 h-full">
            <div className="overflow-hidden rounded-lg h-1/2">
                <img alt="Gallery 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[0]} />
            </div>
            <div className="overflow-hidden rounded-lg h-1/3">
                <img alt="Gallery 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[1]} />
            </div>
        </div>

        {/* Col 2 */}
        <div className="col-span-1 flex flex-col justify-center gap-4 h-full">
            <div className="overflow-hidden rounded-lg h-3/4">
                <img alt="Gallery 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[2]} />
            </div>
        </div>

        {/* Col 3 - Center Piece */}
        <div className="col-span-1 flex flex-col justify-center gap-4 h-full">
            <div className="overflow-hidden rounded-lg h-full">
                <img alt="Gallery 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[3]} />
            </div>
        </div>

        {/* Col 4 */}
        <div className="col-span-1 flex flex-col justify-start gap-4 h-full">
            <div className="overflow-hidden rounded-lg h-2/3">
                <img alt="Gallery 5" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[4]} />
            </div>
            <div className="overflow-hidden rounded-lg h-1/4">
                <img alt="Gallery 6" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[5]} />
            </div>
        </div>

        {/* Col 5 (Desktop only) */}
        <div className="hidden lg:flex col-span-1 flex-col justify-end gap-4 h-full">
            <div className="overflow-hidden rounded-lg h-1/2">
                <img alt="Gallery 7" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src={GALLERY_IMAGES[6]} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
