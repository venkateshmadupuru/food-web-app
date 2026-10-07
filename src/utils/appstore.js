import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import locationReducer from "./locationSlice";

const CART_STORAGE_KEY = "bigbite-cart";

const isValidCartItem = (item) => Boolean(item?.card?.info?.id);

const loadCartItemsFromStorage = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCartItems) return [];

    const parsedCartItems = JSON.parse(storedCartItems);

    if (!Array.isArray(parsedCartItems)) return [];

    return parsedCartItems.filter(isValidCartItem);
  } catch {
    return [];
  }
};

const saveCartItemsToStorage = (cartItems) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // Storage may be unavailable or full.
  }
};

export const createAppStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      theme: themeReducer,
      auth: authReducer,
      search: searchReducer,
      location: locationReducer,
    },
    preloadedState: {
      cart: {
        items: loadCartItemsFromStorage(),
      },
    },
  });

  let previousCartItems = store.getState().cart.items;

  store.subscribe(() => {
    const currentCartItems = store.getState().cart.items;

    if (currentCartItems !== previousCartItems) {
      previousCartItems = currentCartItems;
      saveCartItemsToStorage(currentCartItems);
    }
  });

  return store;
};

const appstore = createAppStore();

export default appstore;
