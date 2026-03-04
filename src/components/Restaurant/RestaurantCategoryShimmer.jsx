import React from "react";
import "../Shimmer/Shimmer.css";
const RestaurantCategoryShimmer = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col justify-center items-center space-y-2 my-3">
        <div className="shimmer w-28 h-8 rounded-md"></div>
        <div className="shimmer w-36 h-8 rounded-md"></div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="shimmer w-[95%] sm:w-11/12 md:w-9/12 lg:w-6/12 h-14 mx-auto rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCategoryShimmer;
