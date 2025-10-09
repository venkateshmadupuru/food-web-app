import {ChevronDownIcon } from "@heroicons/react/16/solid";
import Itemslist from "./Itemslist";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    if (showItems) {
      setShowIndex(null);
    } else {
      setShowIndex();
    }
  };
  return (
    <div>
      <div className="w-6/12 mx-auto my-5 p-4 bg-slate-100 shadow-lg rounded-lg dark:bg-gray-700 dark:text-gray-200 font-serif">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span
            className={`transition-transform duration-300 ${
              showItems ? "rotate-180" : ""
            }`}
          >
            <ChevronDownIcon className="h-7 w-7 text-black dark:text-white"/>
          </span>
        </div>
        {showItems && (
          <div>
            <Itemslist items={data.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategory;
