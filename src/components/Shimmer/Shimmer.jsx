import FoodChoiceShimmer from "../Home/FoodChoiceShimmer";
import "./Shimmer.css";
const Shimmer = () => {
  return (
    <div>
      {/* Search Filters Shimmer */}
      <div className="flex flex-wrap justify-center mx-auto my-5 gap-3">
        <div className="shimmer w-1/2 h-12 rounded-full"></div>
        <div className="shimmer w-24 h-12 rounded-full"></div>
      </div>
      {/* Food Choices Carousel Shimmer */}
      <FoodChoiceShimmer />
      {/* Restaurant Cards Grid Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="shimmer md:w-full md:h-96 w-full h-96 rounded-xl mt-10"
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Shimmer;
