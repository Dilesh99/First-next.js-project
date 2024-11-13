import React from 'react';

const VRPlaceVisit: React.FC = () => {
  return (
    <section className="p-2 pb-6 mt-8 bg-primary">
      <h2 className="text-lg font-bold mb-2 text-white">VR PLACE VISIT &gt;</h2>
      <div className="overflow-hidden">
        <div className="flex w-[100%] animate-scroll-left space-x-4 hover:animate-none">
          {/* Original images */}
          {Array(8).fill('').map((_, index) => (
            
            <img
              key={index}
              src={`/img/vr ${index + 1}.jpg`}
              alt="VR Place"
              className="w-32 h-32 object-cover rounded-lg "
            />
           
          ))}
          {/* Duplicate images for seamless scrolling */}
          {Array(8).fill('').map((_, index) => (
            
            <img
              key={`duplicate-${index}`}
              src={`/img/vr ${index + 1}.jpg`}
              alt="VR Place duplicate"
              className="w-32 h-32 object-cover rounded-lg "
            />
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default VRPlaceVisit;
