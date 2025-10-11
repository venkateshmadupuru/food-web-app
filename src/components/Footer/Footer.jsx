import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white text-gray-800 dark:text-gray-300 dark:bg-gray-800 px-6 py-10 mt-16 min-h-svh md:min-h-fit">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 transition-colors [&_li:hover]:text-orange-400">
        <div>
          <h2 className="text-2xl font-bold">BigBite</h2>
          <p className="mt-2 text-sm">
            Serving cravings one bite at a time. Discover, order, and enjoy from
            your favorite restaurants.
          </p>
          <div className="flex items-center gap-5 mt-4 text-2xl text-gray-800 dark:text-gray-100">
            <FaFacebook className="hover:text-orange-400 transition cursor-pointer"/>
            <FaInstagram className="hover:text-orange-400 transition cursor-pointer"/>
            <FaTwitter className="hover:text-orange-400 transition cursor-pointer"/>
            <FaLinkedinIn className="hover:text-orange-400 transition cursor-pointer"/>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="">Main Page</Link>
            </li>
            <li>
              <Link to="">Restaurants</Link>
            </li>
            <li>
              <Link to="cart">Your Cart</Link>
            </li>
            <li>
              <Link to="">Search Dishes</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Locations</h3>
          <ul className="space-y-2 text-sm cursor-pointer">
            <li>Bengaluru</li>
            <li>Hyderabad</li>
            <li>Chennai</li>
            <li>Vijayawada</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Settings</h3>
          <ul className="space-y-2 text-sm">
            <li>Toggle Theme</li>
            <li>Support</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} BigBite. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
