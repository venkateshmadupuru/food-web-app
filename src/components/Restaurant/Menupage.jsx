import { useParams } from "react-router-dom";
import useMenuPage from "../../hooks/useMenuPage";
import RestaurantCategory from "./RestaurantCategory";
import { useCallback, useState } from "react";
import RestaurantCategoryShimmer from "./RestaurantCategoryShimmer";

const Menupage = () => {
  const { resId } = useParams();
  const { hotelPage, loading, error } = useMenuPage(resId);
  const [showIndex, setShowIndex] = useState(null);

  const categories =
    hotelPage?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    ) || [];

  const { costForTwoMessage, name } =
    hotelPage?.data?.cards?.[2]?.card?.card?.info || {};

  const handleToggle = useCallback((index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  if (loading) return <RestaurantCategoryShimmer />;

  if (error)
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 text-center text-xl font-semibold text-red-500 dark:text-gray-200">
        {error}
      </div>
    );

  if (!hotelPage)
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-xl font-semibold text-gray-900 dark:text-gray-200">
        No menu data available!
      </div>
    );

  if (!categories.length)
    return (
      <div className="w-full px-3 py-12 text-center dark:text-white sm:px-6">
        <h1 className="text-2xl font-bold">
          {hotelPage?.data?.cards?.[2]?.card?.card?.info?.name ?? "Menu"}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          No menu items available right now.
        </p>
      </div>
    );

  return (
    <div className=" w-full h-auto px-3 sm:px-6 text-center dark:text-white space-y-2 my-3 pb-5">
      <h1 className="font-bold text-2xl">{name ?? "Menu"}</h1>
      <h3 className="font-bold text-lg">{costForTwoMessage ?? "400"}</h3>
      {categories.map((category, index) => (
        <RestaurantCategory
          key={`${category?.card?.card?.title}-${index}`}
          data={category?.card?.card}
          showItems={index === showIndex}
          onToggle={handleToggle}
          index={index}
        />
      ))}
    </div>
  );
};

export default Menupage;
