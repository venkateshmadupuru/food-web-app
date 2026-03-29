import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "./locationSlice";
import { DEFAULT_LOCATION, LOCATION_OPTIONS } from "./constants";
import toast from "react-hot-toast";

const getCityName = (label = "") => {
  const parts = label
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return parts[0] || label;
};

const getCurrentPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const useLocationDrawer = () => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector((store) => store.location.selectedLocation);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const selectedLocationText =
    selectedLocation?.displayLabel ||
    getCityName(selectedLocation?.label) ||
    DEFAULT_LOCATION.displayLabel ||
    DEFAULT_LOCATION.label;

  const selectedLocationAddressText =
    selectedLocation?.address ||
    selectedLocation?.label ||
    DEFAULT_LOCATION.address ||
    DEFAULT_LOCATION.label;
  const selectedCityLabel = selectedLocation?.label || "";

  const openLocationPanel = useCallback(() => {
    setSearchValue("");
    setIsOpen(true);
  }, []);

  const closeLocationPanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const applyLocation = useCallback(
    (nextLocation) => {
      dispatch(setLocation(nextLocation));
      setSearchValue("");
      setIsOpen(false);
    },
    [dispatch]
  );

  const selectCity = useCallback(
    (cityOption) => {
      applyLocation({
        ...cityOption,
        displayLabel: getCityName(cityOption.label),
      });
    },
    [applyLocation]
  );

  const cityOptions = useMemo(() => {
    if (!normalizedSearchValue) {
      return LOCATION_OPTIONS;
    }

    return LOCATION_OPTIONS.filter((city) => {
      const cityName = getCityName(city.label).toLowerCase();
      const label = city.label.toLowerCase();
      return (
        cityName.includes(normalizedSearchValue) ||
        label.includes(normalizedSearchValue)
      );
    });
  }, [normalizedSearchValue]);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!normalizedSearchValue) {
        return;
      }

      if (cityOptions.length === 0) {
        return;
      }

      const matchedCity =
        cityOptions.find((city) => {
          const cityName = getCityName(city.label).toLowerCase();
          return (
            cityName === normalizedSearchValue ||
            city.label.toLowerCase() === normalizedSearchValue
          );
        }) ||
        cityOptions.find((city) => {
          const cityName = getCityName(city.label).toLowerCase();
          return (
            cityName.startsWith(normalizedSearchValue) ||
            city.label.toLowerCase().startsWith(normalizedSearchValue)
          );
        }) ||
        cityOptions[0];

      selectCity(matchedCity);
    },
    [cityOptions, normalizedSearchValue, selectCity]
  );

  const handleUseCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }

    setIsLocating(true);

    try {
      let position;

      try {
        position = await getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 0,
        });
      } catch {
        position = await getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 60000,
        });
      }

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      applyLocation({
        label: "Current location",
        address: "Live location",
        lat: latitude.toFixed(6),
        lng: longitude.toFixed(6),
        displayLabel: "Current location",
      });
    } catch {
      toast.error("Unable to access current location");
    } finally {
      setIsLocating(false);
    }
  }, [applyLocation]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    locationSummary: {
      selectedLocationText,
      selectedLocationAddressText,
    },
    openLocationPanel,
    closeLocationPanel,
    drawer: {
      isOpen,
      onClose: closeLocationPanel,
      searchValue,
      onSearchValueChange: setSearchValue,
      onSearchSubmit: handleSearchSubmit,
      onUseCurrentLocation: handleUseCurrentLocation,
      isLocating,
      selectedCityLabel,
      cityOptions,
      onSelectCity: selectCity,
    },
  };
};

export default useLocationDrawer;
