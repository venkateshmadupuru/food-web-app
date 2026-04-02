import React from "react";
import "../Shimmer/Shimmer.css";
const FooterShimmer = () => {
  return (
    <div className="dark:bg-gray-800 bg-white px-6 py-14 mt-16 min-h-[380px] relative overflow-hidden footer-shimmer">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent dark:via-orange-500/45"></div>
      <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/10"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 relative z-10">
        <div className="space-y-5">
          <div className="shimmer h-8 w-36 rounded"></div>
          <div className="space-y-2">
            <div className="shimmer h-4 w-44 rounded"></div>
            <div className="shimmer h-4 w-48 rounded"></div>
            <div className="shimmer h-4 w-36 rounded"></div>
          </div>
          <div className="flex gap-4 mt-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shimmer h-10 w-10 rounded-full"></div>
            ))}
          </div>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-5">
            <div className="shimmer h-6 w-32 rounded"></div>
            <div className="space-y-3">
              <div className="shimmer h-4 w-28 rounded"></div>
              <div className="shimmer h-4 w-32 rounded"></div>
              <div className="shimmer h-4 w-24 rounded"></div>
              <div className="shimmer h-4 w-24 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 pt-7 shimmer h-5 w-56 mx-auto rounded-md relative z-10"></div>
    </div>
  );
};

export default FooterShimmer;
