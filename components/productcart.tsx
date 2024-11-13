"use client";
import { useState } from "react";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative bg-white hover:bg-opacity-80 shadow-lg border-2 border-herit rounded-md p-3 cursor-pointer transition-transform duration-300 ease-in-out 
        ${isExpanded ? "transform -translate-y-2" : "transform translate-y-0"} max-w-xs`}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="mt-1 text-sm font-semibold text-gray-800">{title}</h3>
      <p className="text-xs text-gray-600">{price}</p>

      {isExpanded && (
        <div className="mt-2 text-xs text-gray-700">
          <p>Additional details about the product can go here.</p>
        </div>
      )}

      <div className="text-right">
        <button
          className="mt-2 py-1 px-3 bg-secondary text-white rounded-md text-xs"
          onClick={(e) => e.stopPropagation()} // Prevent card expansion toggle
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
