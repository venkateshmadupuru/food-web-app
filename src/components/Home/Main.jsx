import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer.jsx";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import FoodChoices from "./FoodChoice.jsx";
import RestaurantCard from "../Restaurant/RestaurantCard.jsx";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchFocus } from "../../utils/searchSlice";
import { DEFAULT_LOCATION } from "../../utils/constants";
import useRestaurants from "../../hooks/useRestaurants";

const Main = () => {
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((store) => store.search.isSearchOpen);
  const shouldFocusSearch = useSelector((store) => store.search.shouldFocusSearch);
  const selectedLocation = useSelector((store) => store.location.selectedLocation);
  const activeLat = selectedLocation?.lat || DEFAULT_LOCATION.lat;
  const activeLng = selectedLocation?.lng || DEFAULT_LOCATION.lng;
  const { restaurants, imageGrids, loading, error } = useRestaurants(activeLat, activeLng);

  useEffect(() => {
    setfilteredRestaurant(restaurants);
  }, [restaurants]);

  useEffect(() => {
    if (isSearchOpen && shouldFocusSearch) {
      searchInputRef.current?.focus();
      dispatch(clearSearchFocus());
    }
  }, [isSearchOpen, shouldFocusSearch, dispatch]);

  const handleSearch = () => {
    const filteredRestaurant = restaurants.filter((restaurant) => {
      const name = restaurant?.info?.name?.toLowerCase() || "";
      const cuisines =
        restaurant?.info?.cuisines?.join(" ")?.toLowerCase() || "";
      const search = searchText.toLowerCase();

      return name.includes(search) || cuisines.includes(search);
    });

    setfilteredRestaurant(filteredRestaurant);
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
  if (error) return <div>Unable to load restaurants.</div>;
  const locationHeading =
    selectedLocation?.displayLabel === "Current location"
      ? "Top restaurant chains near you"
      : `Top restaurant chains in ${
          selectedLocation?.label?.split(",")[0] ||
          DEFAULT_LOCATION.label.split(",")[0]
        }`;

  return (
    <div className="font-serif w-full px-3 sm:px-6">
      {isSearchOpen && (
        <div className="w-full mt-3 flex justify-center">
          <div className="flex items-center w-full justify-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              data-testid="searchInput"
              className="m-2 md:p-3 p-1
            md:text-base text-black border border-gray-400 rounded-full w-1/2 pl-4
            text-sm focus:outline-none focus:ring-2 focus:ring-orange-500
            focus:border-orange-500 transition-all duration-300 ease-in-out"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <IoSearch
              className=" md:hidden text-3xl cursor-pointer 
               bg-gray-100 hover:bg-orange-100 
               text-gray-600 hover:text-orange-500
               p-2 rounded-full
               transition-all duration-200 ease-in-out"
              onClick={handleSearch}
            />
            <button
              className="md:block hidden px-4 py-3 m-2 md:text-lg border border-orange-400 rounded-full 
            bg-gradient-to-br from-amber-500 via-orange-400 to-orange-600 
            transform hover:brightness-110 transition-transform duration-300
             text-black font-bold cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 no-underline">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Main;
