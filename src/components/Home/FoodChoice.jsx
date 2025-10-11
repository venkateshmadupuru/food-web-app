import React, { useRef } from "react";
import { CDN_URL } from "../../utils/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import FoodChoiceShimmer from "./FoodChoiceShimmer";

const FoodChoices = ({ images }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isLoading = !images || images.length === 0;

  if (isLoading) return <FoodChoiceShimmer />;

  return (
    <div className="relative w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
        What's on your mind?
      </h2>
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40
         text-white z-10 rounded-full hover:bg-opacity-70 hidden sm:block"
      >
        <ArrowLeftIcon className="h-7 w-10" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40
         text-white z-10 rounded-full hover:bg-opacity-70 hidden sm:block"
      >
        <ArrowRightIcon className="h-7 w-10" />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-6 py-4 scrollbar-hide scroll-smooth
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {images.map((img, index) => (
          <div
            key={img.id || index}
            target="_blank"
            className="flex-shrink-0 rounded-lg bg-white cursor-pointer overflow-hidden w-44 h-44 
            transform hover:scale-110 transition-transform duration-300"
            title={img.action?.text}
          >
            <img
              src={CDN_URL + img.imageId}
              alt={img.accessibility?.altText || `carousel-${index}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodChoices;
