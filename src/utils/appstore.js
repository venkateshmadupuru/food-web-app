import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export default appstore;
