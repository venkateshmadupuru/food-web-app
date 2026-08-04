import React, { useEffect, useRef, useState } from "react";
import { CDN_URL } from "../../utils/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import FoodChoiceShimmer from "./FoodChoiceShimmer";

const FoodChoices = ({ images }) => {
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const { current } = scrollContainerRef;
    if (!current) return;

    const maxScrollLeft = current.scrollWidth - current.clientWidth;

    setCanScrollLeft(current.scrollLeft > 4);
    setCanScrollRight(current.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    const { current } = scrollContainerRef;
    if (!current) return;

    updateScrollState();

    current.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      current.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [images]);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;

    if (!current) return;

    const scrollAmount = 300;

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isLoading = !images || images.length === 0;

  if (isLoading) return <FoodChoiceShimmer />;

  return (
    <div className="relative w-full px-1">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
          What's on your mind?
        </h2>

        <div className="items-center justify-center gap-3 sm:justify-end hidden md:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200
            text-gray-700 shadow-sm transition duration-200 hover:bg-gray-300
            disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700
            dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200
            text-gray-700 shadow-sm transition duration-200 hover:bg-gray-300
            disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700
            dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        data-testid="food-carousel"
        className="flex overflow-x-auto gap-4 px-2 py-4 scrollbar-hide scroll-smooth
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {images.map((img, index) => (
          <div
            key={img.id || index}
            className="flex-shrink-0 rounded-lg bg-white cursor-pointer overflow-hidden
            w-44 h-44 transform hover:scale-110 transition-transform duration-300"
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
