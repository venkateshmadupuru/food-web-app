import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import locationReducer from "./locationSlice";

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
    search: searchReducer,
    location: locationReducer,
  },
});

export default appstore;
