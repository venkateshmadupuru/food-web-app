import { createSlice } from "@reduxjs/toolkit";

const authUiSlice = createSlice({
  name: "authUi",
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

export const { openAuth, closeAuth } = authUiSlice.actions;
export default authUiSlice.reducer;
