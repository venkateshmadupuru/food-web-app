import "../Shimmer/Shimmer.css";

const HeaderShimmer = () => {
  return (
    <div className="w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shimmer h-11 w-11 rounded-2xl"></div>
          <div className="min-w-0">
            <div className="hidden h-5 w-24 shimmer rounded-md sm:block"></div>
            <div className="mt-2 hidden h-3 w-28 shimmer rounded-md sm:block"></div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="shimmer h-10 w-10 rounded-full sm:w-20"></div>
          <div className="shimmer h-10 w-10 rounded-full sm:w-20"></div>
          <div className="shimmer h-10 w-10 rounded-full sm:w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShimmer;
