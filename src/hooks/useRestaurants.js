import { useEffect, useState } from "react";

const CACHE_TTL = 5 * 60 * 1000; 

const getRestaurantsFromResponse = (cards = []) => {
  const restaurantCard = cards.find(
    (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants,
  );

  return (
    restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
  );
};

const getImageGridsFromResponse = (cards = []) => {
  const imageGridCard = cards.find(
    (card) => card.card?.card?.imageGridCards?.info,
  );

  return imageGridCard?.card?.card?.imageGridCards?.info || [];
};

const useRestaurants = (lat, lng) => {
  const [restaurants, setRestaurants] = useState([]);
  const [imageGrids, setImageGrids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = () => setRetryCount((previousCount) => previousCount + 1);

  useEffect(() => {
    if (!lat || !lng) {
      setRestaurants([]);
      setImageGrids([]);
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const cacheKey = `restaurants_${lat}_${lng}`;
    let ignore = false;

    const readCache = () => {
      try {
        const cached = sessionStorage.getItem(cacheKey);

        if (!cached) return null;

        const parsed = JSON.parse(cached);

        if (Date.now() - parsed.timestamp > CACHE_TTL) {
          sessionStorage.removeItem(cacheKey);
          return null;
        }

        return parsed.data;
      } catch {
        sessionStorage.removeItem(cacheKey);
        return null;
      }
    };

    const writeCache = (nextData) => {
      try {
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ data: nextData, timestamp: Date.now() }),
        );
      } catch {
        // Ignore write errors
      }
    };

    const cachedData = readCache();

    if (cachedData) {
      const cards = cachedData?.data?.cards || [];

      setData(cachedData);
      setRestaurants(getRestaurantsFromResponse(cards));
      setImageGrids(getImageGridsFromResponse(cards));
      setError(null);
      setLoading(false);
      return;
    }

    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(
          `${API_BASE_URL}/api/restaurants?lat=${lat}&lng=${lng}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const nextData = await response.json();

        const cards = nextData?.data?.cards || [];

        if (ignore) return;

        setData(nextData);
        setRestaurants(getRestaurantsFromResponse(cards));
        setImageGrids(getImageGridsFromResponse(cards));
        writeCache(nextData);
      } catch (fetchError) {
        if (ignore) return;

        setError(fetchError);
        setRestaurants([]);
        setImageGrids([]);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchRestaurants();

    return () => {
      ignore = true;
    };
  }, [lat, lng, retryCount]);

  return { restaurants, imageGrids, loading, error, data, retry };
};

export default useRestaurants;
