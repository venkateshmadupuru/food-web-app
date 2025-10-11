import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./index.css";
import AuthProvider from "./components/Auth/AuthProvider";
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
    <AuthProvider>
      <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-black">
        <Header loading={loading} />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
