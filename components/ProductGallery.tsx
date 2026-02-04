import React from 'react';

interface Props {
  image: string;
  tag?: string;
}

const ProductGallery: React.FC<Props> = ({ image, tag }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-20 h-20 md:w-24 md:h-24 bg-accent-beige dark:bg-surface-dark rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${
              i === 1 ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex-1 bg-accent-beige dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm relative group">
        <img src={image} alt="product" className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
        {tag && (
          <div className="absolute top-4 right-4 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-full">
            {tag}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
