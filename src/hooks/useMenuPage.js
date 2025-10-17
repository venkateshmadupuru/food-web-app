import { useEffect, useState } from "react";

const useMenuPage = (resId) => {
  const [hotelPage, sethotelPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resId) return;
    const fetchmenu = async () => {
      try {
        const API_BASE_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/menu?resId=${resId}`);
        const data = await response.json();
        sethotelPage(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (resId) fetchmenu();
  }, [resId]);

  return { hotelPage, loading, error };
};
export default useMenuPage;
