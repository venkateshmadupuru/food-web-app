import React from "react";
import "../Shimmer/Shimmer.css"
const FoodChoiceShimmer = () => {
  return (
    <div className="relative w-full px-4 md:px-8">
      <h2 className="shimmer h-10 w-18 rounded-full">
      </h2>
      <div className="flex gap-4 px-6 py-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="shimmer flex-shrink-0 w-44 h-44 mt-5 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FoodChoiceShimmer;
