// components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section: Navigation Links */}
        <div className="flex flex-col space-y-4 text-sm">
          <Link href="/home" legacyBehavior>
            <a>HOME</a>
          </Link>
          <Link href="/museum" legacyBehavior>
            <a>MUSEUM</a>
          </Link>
          <Link href="/market" legacyBehavior>
            <a>MARKETPLACE</a>
          </Link>
          <Link href="#" legacyBehavior>
            <a>CONTACT US</a>
          </Link>
        </div>

        {/* Center Section: Social Media Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          {/* YouTube */}
          <a href="https://youtube.com" aria-label="YouTube">
           <img src="/img/youtube.jpg" alt="Youtube" className="w-8 h-8 rounded-md" />
          </a>
          
          {/* WhatsApp */}
          <a href="https://whatsapp.com" aria-label="WhatsApp">
          <img src="/img/whatsapp.png" alt="whatsapp" className="w-8 h-8 rounded-md" />
            
          </a>
          
          {/* Facebook */}
          <a href="https://facebook.com" aria-label="Facebook">
          <img src="/img/facebook2-.png" alt="facebook" className="w-8 h-8 rounded-md" />
          </a>
          
          {/* Instagram */}
          <a href="https://instagram.com" aria-label="Instagram">
          <img src="/img/instagram.jpeg" alt="facebook" className="w-8 h-8 rounded-md" />
          </a>
        </div>

        {/* Right Section: Heritage Map Placeholder */}
        <div className="mt-6 md:mt-0 ">
          <h4 className="text-xs font-bold mb-2">HERITAGE MAP</h4>
          <img src="/img/heritagemap.gif" alt="map" width={100} />
          
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-xs mt-6">
        © 2024 HeritageConnect Sri Lanka. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
