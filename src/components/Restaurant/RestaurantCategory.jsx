import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Itemslist from "./Itemslist";

const RestaurantCategory = ({ data, showItems, onToggle }) => {
  const title = data?.title ?? "Category";
  const count = data?.itemCards?.length ?? 0;
  return (
    <div className="w-[95%] sm:w-11/12 md:w-9/12 lg:w-6/12 mx-auto my-5 p-4 bg-slate-100 shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200 font-serif">
      <button
        type="button"
        className="w-full flex justify-between items-center cursor-pointer text-left"
        onClick={onToggle}
      >
        <span className="font-bold text-lg">
          {title}({count})
        </span>
        <span
          className={`transition-transform duration-300 ${
            showItems ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon className="h-7 w-7 text-black dark:text-white" />
        </span>
      </button>
      {showItems && (
        <div>
          <Itemslist items={data?.itemCards ?? []} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
