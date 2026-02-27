import React from "react";
import "../Shimmer/Shimmer.css";

const FoodChoiceShimmer = () => {
  return (
    <div className="relative w-full px-1">
      <div className="shimmer w-56 h-8 mb-4 rounded-md"></div>
      <div className="flex overflow-x-hidden gap-4 px-6 py-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="shimmer flex-shrink-0 w-44 h-44 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FoodChoiceShimmer;
