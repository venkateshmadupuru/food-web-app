import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearchOpen: false,
    shouldFocusSearch: false,
    searchInput: "",
    searchQuery: "",
  },
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
      state.shouldFocusSearch = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
      state.shouldFocusSearch = false;
    },
    clearSearchFocus: (state) => {
      state.shouldFocusSearch = false;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    submitSearch: (state) => {
      state.searchQuery = state.searchInput;
    },
  },
});

export const {
  openSearch,
  closeSearch,
  clearSearchFocus,
  setSearchInput,
  submitSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
