import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export default appstore;
