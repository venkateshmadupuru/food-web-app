import { memo } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoStar } from "react-icons/io5";
import { addItem, removeItem } from "../../utils/cartslice";
import { getMenuImage } from "../../utils/getMenuImage";

const getItemPrice = (info) => {
  const priceInPaise = info.price ?? info.defaultPrice ?? 0;
  return Math.round(priceInPaise / 100);
};

const getItemRating = (info) => {
  const aggregatedRating = info.ratings?.aggregatedRating;
  return {
    rating: aggregatedRating?.rating,
    count: aggregatedRating?.ratingCountV2,
  };
};

const ItemCard = ({ item, isCart }) => {
  const dispatch = useDispatch();

  const info = item.card.info;
  const { rating, count } = getItemRating(info);

  const handleAddItem = () => {
    toast.success("Added to cart");
    dispatch(addItem(item));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(info.id));
  };

  return (
    <div
      className="mx-2 flex flex-col gap-4 border-b border-gray-200 py-5 text-left
      last:border-b-0 dark:border-gray-700 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 flex-1 space-y-2 pr-0 sm:pr-5">
        <h3 className="text-lg font-bold leading-snug text-gray-800 dark:text-white">
          {info.name}
        </h3>

        <p className="text-base font-bold text-gray-950 dark:text-gray-100">
          {"\u20B9"}
          {getItemPrice(info)}
        </p>

        {rating && (
          <div className="flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <IoStar className="h-4 w-4" />
            <span>{rating}</span>

            {count && (
              <span className="text-gray-700 dark:text-gray-300">
                ({count})
              </span>
            )}
          </div>
        )}

        {info.description && (
          <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {info.description}
          </p>
        )}
      </div>

      <div className="relative mx-auto w-full max-w-[172px] shrink-0 sm:mx-0">
        <img
          src={getMenuImage(info)}
          onError={(e) => {
            e.currentTarget.src = "/images/menu/default.jpg";
          }}
          className="h-36 w-full rounded-xl object-cover"
          alt={info.name}
          loading="lazy"
        />

        <div
          className="absolute -bottom-4 left-1/2 flex min-h-12 w-[88%]
          -translate-x-1/2 items-center justify-center rounded-lg border
          border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900"
        >
          {isCart ? (
            <div className="flex w-full items-center justify-between px-3">
              <button
                type="button"
                className="rounded-md px-2 text-2xl font-bold text-red-500"
                onClick={handleRemoveItem}
                aria-label={`Remove ${info.name}`}
              >
                -
              </button>

              <p className="text-base font-bold text-gray-900 dark:text-white">
                {item.quantity || 1}
              </p>

              <button
                type="button"
                className="rounded-md px-2 text-2xl font-bold text-emerald-600"
                onClick={handleAddItem}
                aria-label={`Add ${info.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="h-full w-full text-lg font-extrabold text-emerald-600"
              onClick={handleAddItem}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCard);
