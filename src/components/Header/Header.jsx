import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { removeUser } from "../../utils/userSlice";
import { toggleTheme } from "../../utils/themeSlice";
import { useState } from "react";
import HeaderShimmer from "./HeaderShimmer";
import CartIcon from "../Cart/CartIcon";
import { CiUser } from "react-icons/ci";
import { MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { openAuth } from "../../utils/authSlice";

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
        setIsDropDown(false);
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const openSignInPanel = () => {
    dispatch(openAuth({ intent: "signin" }));
  };
  const handleCartClick = () => {
    if (!isAuthenticated) {
      dispatch(openAuth({ intent: "cart" }));
      return;
    }
    navigate("/cart");
  };

  if (loading) {
    return <HeaderShimmer />;
  }

  const navItemClass =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 " +
    "transition-colors hover:bg-orange-50 hover:text-orange-600 dark:text-slate-100 dark:hover:bg-slate-700/70 dark:hover:text-orange-300";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-gray-900/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-lg font-black text-white shadow-sm">
            BB
          </div>
          <div className="min-w-0">
            <h1 className="hidden sm:block truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              BigBite
            </h1>
            <p className="hidden truncate text-xs font-medium text-slate-500 dark:text-slate-300 sm:block">
              Fast food. Fresh mood.
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={handleTheme} className={navItemClass}>
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>
          <button
            type="button"
            className={navItemClass}
            onClick={handleCartClick}
          >
            <CartIcon
              className="h-5 w-5"
              count={isAuthenticated ? cartItems.length : 0}
            />
            <span className="hidden sm:inline">Cart</span>
          </button>

          {isAuthenticated ? (
            <div
              className="relative"
              onFocus={() => setIsDropDown(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsDropDown(false);
                }
              }}
            >
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-700/70 dark:hover:text-orange-300"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-8 w-8 rounded-full border border-orange-400 object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6" />
                )}
              </button>

              {isDropDown && (
                <div
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xl dark:border-slate-700 dark:bg-gray-800 dark:text-white"
                  onMouseDown={(e) => {
                    if (e.target.tagName !== "BUTTON") {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                    <p className="truncate text-sm font-semibold">
                      {user?.displayName || "User"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-300">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus-visible:bg-orange-50 focus-visible:text-orange-600 dark:hover:bg-slate-700 dark:hover:text-orange-300"
                    onMouseDown={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={openSignInPanel}
              className={navItemClass}
            >
              <CiUser className="h-6 w-6" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
