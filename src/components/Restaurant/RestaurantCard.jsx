import { IoStar } from "react-icons/io5";
import { CDN_URL } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resdata } = props;
  const { name, cloudinaryImageId, cuisines, avgRating, locality, costForTwo } =
    resdata?.info;

  const getStarColorClass = (rating) => {
    const parsedRating = parseFloat(rating);
    if (parsedRating >= 4) return "text-green-600 dark:text-green-400";
    if (parsedRating >= 3) return "text-orange-500 dark:text-orange-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <div
      className="w-full mx-auto bg-white rounded-xl overflow-hidden shadow-md no-underline 
      transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer
       dark:bg-gray-800 dark:text-white dark:shadow-lg"
      data-testid="resCard"
    >
      <img
        className="w-full h-56 object-cover block"
        src={CDN_URL + cloudinaryImageId}
        alt="res-img"
      />
      <div className="px-3 py-2">
        <h5 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis py-1">
          {name}
        </h5>
        <div className="flex items-center gap-1">
          <IoStar className={getStarColorClass(avgRating)} size={18} />
          <span className="text-sm font-semibold">{avgRating}</span>
        </div>
        <div className="text-md whitespace-nowrap overflow-hidden text-ellipsis py-2">
          <p>{cuisines.join(",")}</p>
          <p>{costForTwo}</p>
          <p>{locality}</p>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
