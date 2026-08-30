import FoodChoiceShimmer from "../Home/FoodChoiceShimmer";
import "./Shimmer.css";

const Shimmer = () => {
  return (
    <div className="w-full px-3 sm:px-6">
      {/* Food Choices Carousel Shimmer */}
      <div className="my-8">
        <FoodChoiceShimmer />
      </div>

      {/* Restaurant Cards Grid Shimmer */}
      <div className="px-1">
        <div className="shimmer w-72 h-7 mb-4 rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 no-underline">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-full mx-auto bg-white rounded-xl overflow-hidden shadow-md dark:bg-gray-800 dark:shadow-lg"
          >
            <div className="shimmer w-full aspect-[16/10]"></div>
            <div className="px-3 py-2">
              <div className="shimmer h-6 w-3/4 rounded-md"></div>
              <div className="flex items-center gap-1 mt-3">
                <div className="shimmer h-4 w-4 rounded-full"></div>
                <div className="shimmer h-4 w-10 rounded-md"></div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="shimmer h-4 w-5/6 rounded-md"></div>
                <div className="shimmer h-4 w-2/5 rounded-md"></div>
                <div className="shimmer h-4 w-3/5 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
