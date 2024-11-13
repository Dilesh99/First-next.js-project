import React from 'react';

const Recommendations: React.FC = () => {
  return (
    <section className="p-2 pb-6 mt-8 bg-rose-100">
      <h2 className="text-lg font-bold mb-2 text-primary">RECOMMENDATIONS for you &gt;</h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll-right space-x-4">
          {Array(10).fill('').map((_, index) => (
            <img
              key={index}
              src={`/img/rec ${index + 1}.jpg`}
              alt="Trending item"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
          {/* Duplicate images to create a seamless scrolling effect */}
          {Array(10).fill('').map((_, index) => (
            <img
              key={`duplicate-${index}`}
              src={`/img/rec ${index + 1}.jpg`}
              alt="Trending item duplicate"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>

    
  );
};

export default Recommendations;
