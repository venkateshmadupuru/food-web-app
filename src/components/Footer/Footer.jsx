import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterShimmer from "./FooterShimmer";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FooterShimmer />;
  return (
    <div className="bg-white text-gray-800 dark:text-gray-300 dark:bg-gray-800 px-6 py-10 mt-16 min-h-[300px] cursor-pointer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 transition-colors [&_li:hover]:text-orange-400">
        <div>
          <h2 className="text-2xl font-bold">BigBite</h2>
          <p className="mt-2 text-sm">
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
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} BigBite. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
