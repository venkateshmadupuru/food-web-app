import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const noop = () => {};

const LocationDrawer = ({ drawer }) => {
  const {
    isOpen = false,
    onClose = noop,
    searchValue = "",
    onSearchValueChange = noop,
    onSearchSubmit = noop,
    onUseCurrentLocation = noop,
    isLocating = false,
    selectedCityLabel = "",
    cityOptions = [],
    onSelectCity = noop,
  } = drawer || {};
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="Close location selection"
      />

      <aside
        aria-label="Location drawer"
        className="absolute left-0 top-0 h-[100dvh] w-full max-w-[540px] overflow-y-auto bg-slate-100 px-8 py-8 shadow-2xl dark:bg-slate-950 sm:px-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="text-slate-800 transition-colors hover:text-orange-600 dark:text-slate-100 dark:hover:text-orange-300"
          aria-label="Close location panel"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>

        <form onSubmit={onSearchSubmit} className="mt-8">
          <input
            ref={inputRef}
            id="locationInput"
            type="text"
            value={searchValue}
            onChange={(event) => onSearchValueChange(event.target.value)}
            placeholder="Search for a city"
            className="h-14 w-full border border-slate-300 bg-white px-6 text-lg font-medium text-slate-800 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </form>

        <button
          type="button"
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          className="mt-8 w-full border border-slate-300 bg-white p-6 text-left transition-colors hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900"
          aria-busy={isLocating}
        >
          <div className="flex items-start gap-4">
            <MapPinIcon className="mt-1 h-6 w-6 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {isLocating ? "Detecting location..." : "Get current location"}
              </p>
              <p className="mt-1 text-lg text-slate-500 dark:text-slate-300">
                Using GPS
              </p>
            </div>
          </div>
        </button>

        <div className="mt-6 border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
            Popular cities
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {cityOptions.map((city) => (
              <button
                key={city.label}
                type="button"
                onClick={() => onSelectCity(city)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCityLabel === city.label
                    ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-400 dark:bg-slate-700 dark:text-orange-300"
                    : "border-slate-300 bg-slate-50 text-slate-700 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-700 dark:hover:text-orange-300"
                }`}
                aria-pressed={selectedCityLabel === city.label}
              >
                {city.label.split(",")[0]}
              </button>
            ))}

            {cityOptions.length === 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-300">
                No city matches your search.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default LocationDrawer;
