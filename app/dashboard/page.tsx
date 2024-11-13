"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the `useRouter` hook for navigation

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  // Handle logout
  const handleLogout = () => {
    // Clear session data (if any)
    localStorage.removeItem("authToken"); // For example, if you store a token in localStorage
    sessionStorage.removeItem("authToken"); // If you're using sessionStorage

    // Redirect to the seller login page
    router.push("/sellerlogin");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile Hamburger Icon */}
      <div className="md:hidden flex justify-between items-center bg-primary p-4 text-white">
        <h1 className="text-xl font-bold text-herit">Heritage Link</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
          {/* SVG for Hamburger Icon */}
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
            onClick={handleLogout} // Trigger logout when clicked
            className="flex items-center bg-herit p-3 justify-center rounded-md w-full hover:bg-green-800"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-4 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-secondary">Seller Dashboard</h2>
          <div className="flex items-center">
            <span className="mr-3 text-secondary">Mahinda</span>
            <div className="w-8 h-8 bg-secondary rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="py-36 md:py-72 bg-rose-200 rounded-md"></div>
          <div className="space-y-4">
            <div className="bg-rose-200 h-32 md:h-40 rounded-md"></div>
            <div className="bg-rose-200 h-32 rounded-md"></div>
            <div className="bg-rose-200 h-32 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
