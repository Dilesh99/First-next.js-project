"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter for redirection
import type { NextPage } from 'next';

const Navbar: NextPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem('user'); // Assume 'user' is stored in localStorage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Close sidebar when scrolling
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // Remove the user data from localStorage on logout
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to login page
  };

  const isActiveLink = (path: string) => pathname === path;

  return (
    <div className='bg-nave p-2'>
      <nav className="bg-secondary text-white p-2 rounded-md w-full lg:w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="ml-4">
            <Image src="/img/logoLarge.jpeg" alt="Logo" width={50} height={50} className="rounded-full" />
          </div>

          {/* HeritageLink Text (only on mobile) */}
          <div className="md:hidden text-white font-semibold text-3xl absolute left-1/2 transform -translate-x-1/2">
            HeritageLink
          </div>

          {/* Desktop Navigation Links and Buttons */}
          <div className="hidden md:flex md:space-x-8 md:items-center text-sm font-semibold tracking-wide">
            <a
              href="/home"
              className={`hover:text-gray-300 ${isActiveLink('/') ? 'text-gray-400' : ''}`}
            >
              HOME
            </a>
            <a
              href="/museum"
              className={`hover:text-gray-300 ${isActiveLink('/museum') ? 'text-gray-400' : ''}`}
            >
              MUSEUM
            </a>
            <a
              href="/market"
              className={`hover:text-gray-300 ${isActiveLink('/market') ? 'text-gray-400' : ''}`}
            >
              MARKET
            </a>
            <a
              href="https://en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Sri_Lanka"
              className={`hover:text-gray-300 ${isActiveLink('/protect') ? 'underline text-gray-400' : ''}`}
            >
              PROTECT
            </a>
            <div className="flex -space-x-3 ml-4">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleLogout}
                className={`border border-white px-4 py-2 rounded-md ${isHovered ? 'bg-rose-400' : 'bg-secondary'}`}
              >
                LOGOUT
              </button>
              <button
                className={`px-4 py-2 rounded-md ${isHovered ? 'bg-secondary border border-white text-white' : 'bg-rose-400 text-white'}`}
              >
                LINK
              </button>
            </div>
          </div>

          {/* Hamburger Menu Icon (Mobile) */}
          <div className="md:hidden mr-4">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Menu Icon (Hamburger)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu (Slides in from Right) */}
        <div
          className={`fixed right-0 bg-secondary text-white p-4 rounded transform ${
            isOpen ? '-translate-x-3' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between w-1/3 sm:w-1/4 lg:w-1/4 z-30`}
        >
          {/* Navigation Links in Sidebar */}
          <div className="flex flex-col items-start space-y-4 text-sm font-semibold tracking-wide mt-8">
            <a
              href="/home"
              className={`hover:text-gray-300 ${isActiveLink('/home') ? 'text-gray-400' : ''}`}
            >
              HOME
            </a>
            <a
              href="/museum"
              className={`hover:text-gray-300 ${isActiveLink('/museum') ? 'text-gray-400' : ''}`}
            >
              MUSEUM
            </a>
            <a
              href="/market"
              className={`hover:text-gray-300 ${isActiveLink('/market') ? 'text-gray-400' : ''}`}
            >
              MARKET
            </a>
            <a
              href="/protect"
              className={`hover:text-gray-300 ${isActiveLink('/protect') ? 'text-gray-400' : ''}`}
            >
              PROTECT
            </a>
          </div>

          {/* Login and Link Buttons at the Bottom of Sidebar */}
          <div className="flex justify-between -space-x-6 mt-4">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleLogout}
              className={`border border-white px-2 py-1 rounded-md ${isHovered ? 'bg-rose-400' : 'bg-secondary'}`}
            >
              LOGOUT
            </button>
            <button
              className={`px-2 py-1 rounded-md ${isHovered ? 'bg-secondary border border-white text-white' : 'bg-rose-400 text-white'}`}
            >
              LINK
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
