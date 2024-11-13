"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/productcart";

const Market = () => {
  const [notification, setNotification] = useState<string>("");
  const router = useRouter();

  // Simulate checking if the user is logged in (check if token exists in localStorage)
  const isUserLoggedIn = typeof window !== "undefined" && localStorage.getItem("authToken");

  const handleBuy = () => {
    if (!isUserLoggedIn) {
      setNotification("You are required to login to proceed.");
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/userlogin");
      }, 2000);
    } else {
      setNotification("Item purchased successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header with Search Bar */}
      <header className="flex justify-between items-center bg-[#e6d1c7] shadow-md">
        {/* Header code here... */}
      </header>

      <main className="flex-1 p-4">
        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg z-10">
            {notification}
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:pl-10 mx-auto ">
          {/* Example of a Product Card */}
          <ProductCard
            imageUrl="/img/rec 2.jpg" // Replace with your image path
            title="Sri Lankan Cultural Devil Mask"
            price="LKR 5000.00"
            onBuy={handleBuy} // Pass the buy logic as a prop
          />

          {/* Placeholder Cards */}
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCard
              key={index}
              imageUrl="/images/devil-mask.jpg" // Replace with your placeholder image path
              title={`Product ${index + 2}`}
              price="LKR 3000.00"
              onBuy={handleBuy} // Pass the buy logic as a prop
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Market;
