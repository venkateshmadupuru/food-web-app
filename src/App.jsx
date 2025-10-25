import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";

const App = () => {
  const theme = useSelector((store) => store.theme.mode);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <Header loading={loading} />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
  );
};

export default App;
