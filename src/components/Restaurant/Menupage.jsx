import { useParams } from "react-router-dom";
import useMenuPage from "../../hooks/useMenuPage";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import RestaurantCategoryShimmer from "./RestaurantCategoryShimmer";
const Menupage = () => {
  const { resId } = useParams();
  const { hotelPage, loading, error } = useMenuPage(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (loading) return <RestaurantCategoryShimmer />;

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500 dark:text-gray-200 text-2xl font-semibold">
        Something went wrong! Please try again later.
      </div>
    );

  if (!hotelPage)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-900 dark:text-gray-200 text-2xl font-semibold">
        No menu data available!
      </div>
    );

  const { city, costForTwoMessage, name } =
    hotelPage?.data?.cards?.[2]?.card?.card?.info || {};

  const categories =
    hotelPage?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    ) || [];
  return (
    <div className=" w-full h-auto text-center dark:text-white space-y-2 my-3 pb-5">
      <h1 className="font-bold text-2xl">{name ?? "Menu"}</h1>
      <h3 className="font-bold text-lg">
        {city ?? "Bangalore"} - {costForTwoMessage ?? "₹400"}
      </h3>
      {categories.map((category, Index) => (
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
          showItems={Index === showIndex}
          setShowIndex={() => setShowIndex(showIndex === Index ? null : Index)}
        />
      ))}
    </div>
  );
};

export default Menupage;
