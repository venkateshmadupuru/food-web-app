import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    open: false,
    intent: null, // "cart" | "signin" | null
  },
  reducers: {
    openAuth: (state, action) => {
      state.open = true;
      state.intent = action.payload?.intent ?? null;
    },
    closeAuth: (state) => {
      state.open = false;
      state.intent = null;
    },
  },
});

export const { openAuth, closeAuth } = authSlice.actions;
export default authSlice.reducer;
