// pages/dashboard.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/useAuth"; // Import the useAuth hook
import AuthCheck from "@/components/authcheck"; // Import the AuthCheck component

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false); // State for purchase success
  const router = useRouter();

  const isLoggedIn = useAuth(); // Using the useAuth hook

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    router.push("/sellerlogin"); // Redirect to seller login page
  };

  const handlePurchase = () => {
    if (!isLoggedIn) {
      router.push("/userlogin"); // Redirect to login if not logged in
    } else {
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
      }, 3000);
    }
  };

  return (
    <AuthCheck>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex justify-between items-center bg-primary p-4 text-white">
          <h1 className="text-xl font-bold text-herit">Heritage Link</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
            <svg
              className="h-6 w-6 bg-herit text-cream"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 7h16a1 1 0 010 2H4a1 1 0 010-2zm0 7h16a1 1 0 010 2H4a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-60 h-full bg-primary text-white flex flex-col justify-between fixed md:relative z-10`}
        >
          <div>
            <h1 className="text-3xl font-bold p-4 text-herit hidden md:block">Heritage Link</h1>
            <nav className="space-y-4">
              <a href="#" className="flex items-center p-4 hover:bg-cream hover:text-secondary">
                Dashboard
              </a>
              <a href="#" className="flex items-center p-4 hover:bg-cream hover:text-secondary">
                Products
              </a>
              <a href="#" className="flex items-center p-4 hover:bg-cream hover:text-secondary">
                Analytics
              </a>
            </nav>
          </div>
          <div className="p-4 py-80">
            <button
              onClick={handleLogout}
              className="flex items-center bg-herit p-3 justify-center rounded-md w-full hover:bg-green-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-gray-100">
          <header className="flex justify-between items-center mb-4 md:mb-8">
            <h2 className="text-lg md:text-xl font-semibold text-secondary">Seller Dashboard</h2>
            <div className="flex items-center">
              <span className="mr-3 text-secondary">Mahinda</span>
              <div className="w-8 h-8 bg-secondary rounded-full"></div>
            </div>
          </header>

          <button onClick={handlePurchase} className="mt-4 bg-blue-500 text-white p-2 rounded-md">
            Buy Item
          </button>

          {purchaseSuccess && (
            <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
              Purchase Successful!
            </div>
          )}
        </div>
      </div>
    </AuthCheck>
  );
};

export default Dashboard;
