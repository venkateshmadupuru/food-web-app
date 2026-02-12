import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import authSlice from "./authSlice";

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer,
    authUi: authSlice.reducer,
  },
});

export default appstore;
