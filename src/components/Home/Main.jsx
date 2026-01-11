import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer.jsx";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import FoodChoices from "./FoodChoice.jsx";
import RestaurantCard from "../Restaurant/RestaurantCard.jsx";
import { IoSearch } from "react-icons/io5";

const Main = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [imageGrids, setImageGrids] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/restaurants`);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const restaurantCard = data?.data?.cards.find(
          (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        const newRestaurants =
          restaurantCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        setlistOfRestaurant(newRestaurants);
        setfilteredRestaurant(newRestaurants);
        const imageGridCard = data?.data?.cards.find(
          (card) => card.card?.card?.imageGridCards?.info
        );
        const imageInfo = imageGridCard?.card?.card?.imageGridCards?.info || [];

        setImageGrids(imageInfo);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchedData();
  }, []);

  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurant.filter((restaurant) => {
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
  if (listOfRestaurant.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="font-serif">
      <div className="w-full mt-3 flex justify-center">
        <div className="flex items-center w-full justify-center gap-2">
          <input
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
      <div>
        {imageGrids.length > 0 && (
          <div className="my-8">
            <FoodChoices images={imageGrids} />
          </div>
        )}
      </div>
      <h3 className="text-gray-900 dark:text-white text-2xl md:text-3xl px-4 mb-4 font-semibold">
        Top restaurant chains in Bangalore
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 no-underline">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/app/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Main;
