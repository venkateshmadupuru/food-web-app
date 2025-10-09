import React from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer.jsx";
import useOnlineStatus from "../../hooks/useOnlineStatus.jsx";
import FoodChoices from "./FoodChoice.jsx";

const Main = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [imageGrids, setImageGrids] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/restaurants");

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
  const OnlineStatus = useOnlineStatus();
  if (OnlineStatus === false) {
    return (
      <h1 className="text-center text-xl">
        Network Error, Please check network connection!!!
      </h1>
    );
  }
  if (listOfRestaurant.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="font-serif">
      <div className="text-lg w-full mt-3 flex justify-center">
        <input
          type="text"
          data-testid="searchInput"
          className="m-2 p-3 md:text-lg border border-orange-900 rounded-full w-1/2 pl-4 text-md"
          placeholder="Search for restaurants, cuisines..."
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
        <button
          className="px-4 py-3 m-2 border border-orange-400 rounded-full bg-gradient-to-br from-amber-500 via-orange-400 to-orange-600 transform hover:scale-105 transition-transform duration-300 text-black font-bold cursor-pointer"
          onClick={() => {
            const filteredRestaurant = listOfRestaurant.filter((restaurant) => {
              const name = restaurant?.info?.name?.toLowerCase() || "";
              const cuisines =
                restaurant?.info?.cuisines?.join(" ")?.toLowerCase() || "";
              const search = searchText.toLowerCase();

              return name.includes(search) || cuisines.includes(search);
            });

            setfilteredRestaurant(filteredRestaurant);
          }}
        >
          Search
        </button>
      </div>
      {imageGrids.length > 0 && (
        <div className="my-8">
          <FoodChoices images={imageGrids} />
        </div>
      )}
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
