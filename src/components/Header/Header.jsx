import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { toggleTheme } from "../../utils/themeSlice";
import { useEffect, useRef, useState } from "react";
import HeaderShimmer from "./HeaderShimmer";
import CartIcon from "../Cart/CartIcon";
import { CiUser } from "react-icons/ci";
import { MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { openAuth } from "../../utils/authSlice";
import {
  openSearch,
  closeSearch,
  clearSearchFocus,
  setSearchInput,
  submitSearch,
} from "../../utils/searchSlice";
import useLocationDrawer from "../../utils/useLocationDrawer";
import LocationDrawer from "./LocationDrawer";

const Header = ({ loading }) => {
  const cartItems = useSelector((store) => store.cart?.items);
  const theme = useSelector((store) => store.theme.mode);
  const user = useSelector((store) => store.user);
  const isSearchOpen = useSelector((store) => store.search?.isSearchOpen ?? false);
  const shouldFocusSearch = useSelector((store) => store.search?.shouldFocusSearch ?? false);
  const searchInput = useSelector((store) => store.search?.searchInput ?? "");
  const [isDropDown, setIsDropDown] = useState(false);
  const searchInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!user;

  const { locationSummary, openLocationPanel, closeLocationPanel, drawer } =
    useLocationDrawer();

  const { selectedLocationText, selectedLocationAddressText } = locationSummary;

  const handleSignOut = async () => {
    try {
      await import("../../utils/firebase");
      const authModule = await import("firebase/auth");
      const auth = authModule.getAuth();
      await authModule.signOut(auth);
      dispatch(removeUser());
      setIsDropDown(false);
      navigate("/");
    } catch {
      navigate("/error");
    }
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
  const handleSearchSubmit = () => {
    dispatch(submitSearch());
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  const handleCloseSearch = () => {
    dispatch(closeSearch());
  };
  const handleSearchClick = () => {
    if (isSearchOpen) {
      handleSearchSubmit();
      return;
    }

    dispatch(openSearch());

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleOpenLocationPanel = () => {
    setIsDropDown(false);
    openLocationPanel();
  };

  useEffect(() => {
    closeLocationPanel();
  }, [location.pathname, closeLocationPanel]);

  useEffect(() => {
    if (isSearchOpen && shouldFocusSearch) {
      searchInputRef.current?.focus();
      dispatch(clearSearchFocus());
    }
  }, [isSearchOpen, shouldFocusSearch, dispatch]);

  if (loading) {
    return <HeaderShimmer />;
  }

  const navItemClass =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 " +
    "transition-colors hover:bg-orange-50 hover:text-orange-600 dark:text-slate-100 dark:hover:bg-slate-700/70 dark:hover:text-orange-300";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-gray-900/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
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

            <button
              type="button"
              onClick={handleOpenLocationPanel}
              className={`${navItemClass} max-w-[320px] px-3 py-1.5`}
            >
              <MapPinIcon className="h-5 w-5 shrink-0 text-orange-500" />
              <span className="hidden min-w-0 text-left md:block">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {selectedLocationText}
                </span>
                <span className="block max-w-44 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {selectedLocationAddressText}
                </span>
              </span>
              <ChevronDownIcon className="hidden h-4 w-4 shrink-0 md:block" />
            </button>
          </div>
          <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
            {isSearchOpen && (
              <form
                className="relative w-full max-w-md"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSearchSubmit();
                }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  aria-label="Search restaurants"
                  placeholder="Search restaurants"
                  value={searchInput}
                  onChange={(event) =>
                    dispatch(setSearchInput(event.target.value))
                  }
                  className="h-10 w-full rounded-full border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-orange-500 dark:text-slate-300"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={handleCloseSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-orange-500 dark:text-slate-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
          <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
            {!isSearchOpen && (
              <button
                type="button"
                onClick={handleSearchClick}
                className={`hidden md:inline-flex ${navItemClass}`}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleTheme}
              className={navItemClass}
            >
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
                  aria-label="User profile"
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

      <LocationDrawer drawer={drawer} />
    </>
  );
};
export default Header;
