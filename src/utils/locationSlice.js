import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LOCATION, LOCATION_STORAGE_KEY } from "./constants";

const isValidLocation = (value) => {
  return (
    value &&
    typeof value.label === "string" &&
    typeof value.lat === "string" &&
    typeof value.lng === "string"
  );
};

const loadLocationFromStorage = () => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCATION;
  }

  try {
    const storedValue = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!storedValue) {
      return DEFAULT_LOCATION;
    }

    const parsedValue = JSON.parse(storedValue);
    if (!isValidLocation(parsedValue)) {
      return DEFAULT_LOCATION;
    }

    return parsedValue;
  } catch {
    return DEFAULT_LOCATION;
  }
};

const saveLocationtoStorage = (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(value));
  }
};

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedLocation: loadLocationFromStorage(),
  },
  reducers: {
    setLocation: (state, action) => {
      if (!isValidLocation(action.payload)) {
        return;
      }

      state.selectedLocation = action.payload;
      saveLocationtoStorage(action.payload);
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
