import React from "react";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer.jsx";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import FoodChoices from "./FoodChoice.jsx";
import RestaurantCard from "../Restaurant/RestaurantCard.jsx";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput, submitSearch } from "../../utils/searchSlice";
import { DEFAULT_LOCATION } from "../../utils/constants";
import useRestaurants from "../../hooks/useRestaurants";

const Main = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((store) => store.search?.searchInput ?? "");
  const searchQuery = useSelector((store) => store.search?.searchQuery ?? "");
  const selectedLocation = useSelector((store) => store.location?.selectedLocation);
  const activeLat = selectedLocation?.lat || DEFAULT_LOCATION.lat;
  const activeLng = selectedLocation?.lng || DEFAULT_LOCATION.lng;
  const { restaurants, imageGrids, loading, error, retry } = useRestaurants(
    activeLat,
    activeLng,
  );
  const cityName =
    selectedLocation?.label?.split(",")[0] ||
    DEFAULT_LOCATION.label.split(",")[0];
  const locationHeading =
    selectedLocation?.displayLabel === "Current location"
      ? "Top restaurant chains near you"
      : `Top restaurant chains in ${cityName}`;

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredRestaurant = restaurants.filter((restaurant) => {
      const name = restaurant?.info?.name?.toLowerCase() || "";
      const cuisines =
        restaurant?.info?.cuisines?.join(" ")?.toLowerCase() || "";

      return (
        !normalizedSearchQuery ||
        name.includes(normalizedSearchQuery) ||
        cuisines.includes(normalizedSearchQuery)
      );
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(submitSearch());
  };

  const OnlineStatus = useOnlineStatus();
  if (OnlineStatus === false) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:text-gray-50">
        <h1 className="text-3xl text-center">
          Network Error, Please check network connection!!!
        </h1>
      </div>
    );
  }
  if (loading) return <Shimmer />;
  if (error) {
    return (
      <div
        role="alert"
        className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center"
      >
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Could not load restaurants in {cityName}.
        </p>
        <button
          type="button"
          onClick={retry}
          className="cursor-pointer rounded-md border border-orange-600 bg-orange-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="font-serif w-full px-3 sm:px-6">
      <form
        className="relative mb-4 mt-3 w-full md:hidden"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          aria-label="Search restaurants"
          placeholder="Search restaurants"
          value={searchInput}
          onChange={(event) => dispatch(setSearchInput(event.target.value))}
          className="h-10 w-full rounded-full border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-orange-500 dark:text-slate-300"
        >
          <IoSearch className="h-5 w-5" />
        </button>
      </form>
      <div>
        {imageGrids.length > 0 && (
          <div className="my-8">
            <FoodChoices images={imageGrids} />
          </div>
        )}
      </div>
      <h2 className="text-gray-900 dark:text-white text-xl md:text-2xl px-1 mb-4 font-semibold">
        {locationHeading}
      </h2>
      {restaurants.length === 0 ? (
        <div
          role="status"
          className="py-12 text-center text-slate-600 dark:text-slate-300"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Restaurants aren&apos;t available in {cityName} right now.
          </h3>
          <p className="mt-2">Try selecting another location.</p>
        </div>
      ) : filteredRestaurant.length === 0 ? (
        <p
          role="status"
          className="py-12 text-center text-slate-600 dark:text-slate-300"
        >
          No restaurants match &quot;{searchQuery}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 no-underline">
          {filteredRestaurant.map((restaurant, index) => (
            <Link
              key={restaurant.info.id}
              to={`/restaurants/${restaurant.info.id}`}
            >
              <RestaurantCard resdata={restaurant} isAboveFold={index < 5} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Main;
