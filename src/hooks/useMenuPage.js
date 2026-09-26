import { useEffect, useState } from "react";

const useMenuPage = (resId) => {
  const [hotelPage, setHotelPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resId) {
      setLoading(false);
      setError("Restaurant ID is missing.");
      setHotelPage(null);
      return;
    }

    const controller = new AbortController();

    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(
          `${API_BASE_URL}/api/menu?resId=${resId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("The menu is currently unavailable.");
        }

        const data = await response.json();
        if (controller.signal.aborted) return;

        setHotelPage(data);
      } catch (caughtError) {
        if (controller.signal.aborted) return;

        setError(
          caughtError.message ||
            "Something went wrong. Please try again later.",
        );
        setHotelPage(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchMenu();
    return () => controller.abort();
  }, [resId]);

  return { hotelPage, loading, error };
};
export default useMenuPage;
