interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  onBuy: () => void; // Callback function for the "Buy" button
}

const ProductCard = ({ imageUrl, title, price, onBuy }: ProductCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-gray-600 mt-1">{price}</p>
      <button
        onClick={onBuy} // Trigger the buy function passed from parent
        className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-green-800 transition-colors duration-300"
      >
        Buy
      </button>
    </div>
  );
};

export default ProductCard;
