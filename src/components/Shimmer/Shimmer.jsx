import FoodChoiceShimmer from "../Home/FoodChoiceShimmer";
import "./Shimmer.css";
const Shimmer = () => {
  return (
    <div>
      {/* Search Filters Shimmer */}
      <div className="flex flex-wrap justify-center mx-auto my-5 gap-3">
        <div className="shimmer w-1/2 md:h-12 h-8 rounded-full"></div>
        <div className="shimmer md:w-24 w-8 md:h-12 h-8 rounded-full"></div>
      </div>
      {/* Food Choices Carousel Shimmer */}
      <FoodChoiceShimmer />
      {/* Restaurant Cards Grid Shimmer */}
      <div className="shimmer w-96 h-8 px-6 mt-6 px-8 rounded-md"></div>  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="shimmer md:w-full md:h-96 w-full h-96 rounded-xl mt-8"
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Shimmer;
