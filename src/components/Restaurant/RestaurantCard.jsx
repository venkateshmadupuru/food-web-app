import { IoChevronForward, IoStar } from "react-icons/io5";
import { CDN_URL } from "../../utils/constants";

const getRatingToneClass = (rating) => {
  if (rating === undefined || rating === null || rating === "") {
    return "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-300";
  }

  const parsedRating = parseFloat(rating);
  if (parsedRating >= 4) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (parsedRating >= 3) {
    return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300";
};

const getRatingIconClass = (rating) => {
  if (rating === undefined || rating === null || rating === "") {
    return "text-slate-500 dark:text-slate-300";
  }

  const parsedRating = parseFloat(rating);
  if (parsedRating >= 4) return "text-emerald-600 dark:text-emerald-300";
  if (parsedRating >= 3) return "text-orange-600 dark:text-orange-300";
  return "text-red-600 dark:text-red-300";
};

const RestaurantCard = (props) => {
  const { resdata, isAboveFold } = props;
  const {
    name,
    cloudinaryImageId,
    cuisines = [],
    avgRating,
    locality,
    costForTwo,
  } = resdata?.info || {};

  const cuisineText = cuisines.filter(Boolean).slice(0, 3).join(", ");
  const ratingToneClass = getRatingToneClass(avgRating);
  const ratingIconClass = getRatingIconClass(avgRating);
  const ratingLabel = avgRating || "New";

  return (
    <div
      className="group relative mx-auto w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-100 group-hover:scale-105"
          loading={isAboveFold ? "eager" : "lazy"}
          fetchpriority={isAboveFold ? "high" : "auto"}
          decoding="async"
          src={CDN_URL + cloudinaryImageId}
          alt={name || "Restaurant image"}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent" />
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${ratingToneClass}`}
        >
          <IoStar className="h-3.5 w-3.5" />
          {ratingLabel}
        </span>
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <h5 className="truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            {name}
          </h5>
          <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
            {costForTwo || "Check price"}
          </span>
        </div>

        <div className="space-y-1">
          <p className="truncate text-sm font-medium text-slate-600 dark:text-slate-300">
            {cuisineText || "Popular favorites"}
          </p>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {locality || "Great nearby food"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
          <div className="flex items-center gap-1.5">
            <IoStar className={`h-4 w-4 ${ratingIconClass}`} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {ratingLabel}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-orange-300">
            View menu
            <IoChevronForward className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
