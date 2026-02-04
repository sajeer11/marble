import React from 'react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = ['description', 'additional information', 'reviews'];

  return (
    <div className="mt-24 border-t border-gray-100 dark:border-gray-800 pt-12">
      <div className="flex justify-center space-x-12 mb-12 text-lg font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize transition-all border-b-2 ${
              activeTab === tab
                ? 'text-black dark:text-white border-black dark:border-white'
                : 'text-gray-400 border-transparent hover:text-black'
            }`}
          >
            {tab} {tab === 'reviews' && '[5]'}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-gray-500 dark:text-gray-400 leading-relaxed text-justify space-y-6">
        <p>
          Statuario marble is a striking and exclusive stone, characterized by its distinct gray and gold veining throughout and a striking, bold pattern.
        </p>
        <p>
          Weighing approximately 2800 kg/m³, this dense natural stone offers excellent durability when properly sealed.
        </p>
      </div>
    </div>
  );
};

export default ProductTabs;
