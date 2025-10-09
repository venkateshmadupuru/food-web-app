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
  if (!hotelPage) return <div>No menu data available</div>;
  if (error) return <div>No Menu data available</div>;
  const { city, costForTwoMessage, name } =
    hotelPage?.data?.cards?.[2]?.card?.card?.info || {};

  const categories =
    hotelPage?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];
  return (
    <div className="text-center dark:text-white space-y-2 my-3 pb-5">
      <h1 className="font-bold text-2xl">{name}</h1>
      <h3 className="font-bold text-lg">
        {city}- {costForTwoMessage}
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
