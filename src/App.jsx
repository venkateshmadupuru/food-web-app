import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
import { useEffect, useState, lazy, Suspense } from "react";
import Footer from "./components/Footer/Footer";

const AuthPanel = lazy(() => import("./components/Auth/AuthPanel"));

const App = () => {
  const theme = useSelector((store) => store.theme.mode);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Header loading={loading} />
      <Suspense fallback={null}>
        <AuthPanel />
      </Suspense>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
