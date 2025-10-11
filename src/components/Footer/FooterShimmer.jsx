import React from "react";
import "../Shimmer/Shimmer.css";
const FooterShimmer = () => {
  return (
    <div className="dark:bg-gray-800 bg-white px-6 py-10 mt-16 min-h-[300px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="shimmer h-6 w-28 rounded"></div>
          <div className="space-y-2">
            <div className="shimmer h-3 w-40 rounded"></div>
            <div className="shimmer h-3 w-44 rounded"></div>
            <div className="shimmer h-3 w-32 rounded"></div>
          </div>
          <div className="flex gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shimmer h-8 w-8 rounded-full"></div>
            ))}
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="shimmer h-5 w-32 rounded"></div>
            <div className="shimmer h-3 w-24 rounded"></div>
            <div className="shimmer h-3 w-28 rounded"></div>
            <div className="shimmer h-3 w-20 rounded"></div>
            <div className="shimmer h-3 w-20 rounded"></div>
          </div>
        ))}
      </div>
      <div className="mt-16 pt-6 shimmer h-4 w-52 mx-auto rounded-md"></div>
    </div>
  );
};

export default FooterShimmer;
