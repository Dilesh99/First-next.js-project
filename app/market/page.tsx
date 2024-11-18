import ProductCard from "@/components/productcart";

const Market = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header with Search Bar */}
      <header className="flex justify-between items-center p-4 bg-[#e6d1c7] shadow-md">
        {/* Header content here... */}
      </header>

      <main className="flex-1 p-5">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto px-4">
          {/* Example of a Product Card */}
          <ProductCard
            imageUrl="/img/rec 2.jpg" // Replace with your image path
            title="Sri Lankan Cultural Devil Mask"
            price="LKR 5000.00"
          />

          {/* Placeholder Cards */}
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCard
              key={index}
              imageUrl="/images/devil-mask.jpg" // Replace with your placeholder image path
              title={`Product ${index + 2}`}
              price="LKR 3000.00"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Market;
