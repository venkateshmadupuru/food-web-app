import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import FooterShimmer from "./FooterShimmer";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FooterShimmer />;
  return (
    <div className="bg-white text-gray-800 dark:text-gray-300 dark:bg-gray-800 px-6 py-14 mt-16 min-h-[380px] cursor-pointer relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent dark:via-orange-500/50"></div>
      <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/10"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 transition-colors [&_li:hover]:text-orange-400 relative z-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            BigBite
          </h2>
          <p className="max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-300">
            Serving cravings one bite at a time. Discover, order, and enjoy from
            your favorite restaurants.
          </p>
          <div className="flex items-center gap-5 mt-4 text-2xl text-gray-800 dark:text-gray-100">
            <FaFacebook className="hover:text-orange-400 transition" />
            <FaInstagram className="hover:text-orange-400 transition " />
            <FaTwitter className="hover:text-orange-400 transition" />
            <FaLinkedinIn className="hover:text-orange-400 transition" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Partners</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Available in:</h3>
          <ul className="space-y-2 text-sm">
            <li>Bengaluru</li>
            <li>Hyderabad</li>
            <li>Chennai</li>
            <li>Vijayawada</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Help & Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@bigbite.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Help & Support</li>
            <li>Feedback</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-7 text-sm text-center text-gray-400 relative z-10">
        <p>&copy; {new Date().getFullYear()} BigBite. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
