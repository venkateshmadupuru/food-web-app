import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearchOpen: false,
    shouldFocusSearch: false,
  },
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
      state.shouldFocusSearch = true;
    },
    clearSearchFocus: (state) => {
      state.shouldFocusSearch = false;
    },
  },
});

export const { openSearch, clearSearchFocus } = searchSlice.actions;
export default searchSlice.reducer;
