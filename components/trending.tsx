import React from 'react';
import Navbar from './navbar';

const Trending: React.FC = () => {
  return (
    <div>
    <section className="p-2 pb-4 bg-cream overflow-hidden">
      <h2 className="text-lg font-bold mb-2 text-herit">TRENDING &gt;</h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll-right space-x-4">
          {Array(12).fill('').map((_, index) => (
            <img
              key={index}
              src={`/img/trending ${index + 1}.jpg`}
              alt="Trending item"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
          {/* Duplicate images to create a seamless scrolling effect */}
          {Array(12).fill('').map((_, index) => (
            <img
              key={`duplicate-${index}`}
              src={`/img/trending ${index + 1}.jpg`}
              alt="Trending item duplicate"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
    </div>
    
  );
};

export default Trending;
