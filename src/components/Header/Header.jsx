import { LOGO_URL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { removeUser } from "../../utils/userSlice";
import { toggleTheme } from "../../utils/themeSlice";
import { useState } from "react";
import HeaderShimmer from "./HeaderShimmer";
import CartIcon from "../Cart/CartIcon";
import {
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import toast from "react-hot-toast";

const Header = ({ loading }) => {
  const cartItems = useSelector((store) => store.cart.items);
  const theme = useSelector((store) => store.theme.mode);
  const user = useSelector((store) => store.user);
  const [isDropDown, setIsDropDown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to access the cart");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  if (loading) {
    return <HeaderShimmer />;
  }
  return (
    <div className="flex justify-between items-center shadow-md dark:bg-gray-800 dark:text-white font-serif">
      <div>
        <img
          className="logo md:w-14 md:h-14 w-10 h-10 bg-orange-600 m-3 rounded-full p-1 
          hover:scale-105 transition-transform duration-300"
          src={LOGO_URL}
          alt="brand-logo"
        />
      </div>

      <div className="text-center flex-1">
        <h1 className="md:block hidden text-3xl  font-extrabold bg-gradient-to-br from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          BigBite
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 italic md:block hidden">
        Your daily bite of Happiness
        </p>
      </div>
      <div>
        <ul className=" flex justify-center items-center text-xl px-3">
          <li className="relative group mr-2 pr-2 font-bold transition duration-300 ease-in-out hover:scale-110 hover:text-orange-400">
            <Link to={"/"}>
              <HomeIcon className="h-7 w-7" />
            </Link>
            <span
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 bg-gray-800
               text-white dark:text-gray-900 dark:bg-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Home
            </span>
          </li>
          <li className="relative group pr-2 font-bold transition duration-300 ease-in-out hover:scale-110 hover:text-orange-400">
            <button
              className="flex items-center space-x-1"
              onClick={handleCartClick}
            >
              <CartIcon count={isAuthenticated ? cartItems.length : 0} />
            </button>
            <span
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 bg-gray-800
               text-white dark:text-gray-900 dark:bg-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Cart
            </span>
          </li>
          <li className="relative group">
            <button onClick={handleTheme} className="m-3 cursor-pointer">
              {theme === "light" ? (
                <MoonIcon className="h-7 w-7" />
              ) : (
                <SunIcon className="h-7 w-7" />
              )}
            </button>
            <span
              className="absolute left-1/2 transform -translate-x-1/2 mt-12 w-max px-2 py-1 bg-gray-800
             text-white dark:text-gray-900 dark:bg-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </li>
          {isAuthenticated ? (
            <li
              className="relative"
              tabIndex={0}
              onFocus={() => setIsDropDown(true)}
              onBlur={() => setIsDropDown(false)}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="h-8 w-8 rounded-full cursor-pointer object-cover border-2 border-orange-500"
                />
              ) : (
                <UserCircleIcon className="h-7 w-7 cursor-pointer" />
              )}

              {isDropDown && (
                <div className=" absolute z-10 right-4 w-40 bg-white text-black dark:bg-gray-800 dark:text-white text-sm rounded-lg shadow-lg border-2 border-orange-600">
                  <div className="px-4 py-4 border-b border-black dark:border-white">
                    <p className="font-semibold truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="truncate text-xs">{user?.email}</p>
                  </div>
                  <button
                    className="px-4 py-4 font-semibold hover:text-orange-400"
                    onMouseDown={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-orange-500 text-white text-base font-semibold 
                    hover:bg-orange-600 transition"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
