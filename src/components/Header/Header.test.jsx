import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "./Header";
import cartReducer from "../../utils/cartslice";
import themeReducer from "../../utils/themeSlice";
import userReducer from "../../utils/userSlice";
import authReducer from "../../utils/authSlice";
import searchReducer from "../../utils/searchSlice";
import "@testing-library/jest-dom";

// Mock the custom hooks
jest.mock("../../utils/useLocationDrawer", () => ({
  __esModule: true,
  default: () => ({
    locationSummary: {
      selectedLocationText: "Bangalore",
      selectedLocationAddressText: "HSR Layout, Bangalore",
    },
    openLocationPanel: jest.fn(),
    closeLocationPanel: jest.fn(),
    drawer: false,
  }),
}));

jest.mock("../../utils/firebase", () => ({}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      theme: themeReducer,
      user: userReducer,
      auth: authReducer,
      search: searchReducer,
    },
    preloadedState: {
      cart: { items: [] },
      theme: { mode: "light" },
      user: null,
      auth: {},
      search: {},
    },
  });
};

 const renderHeaderWithStore = (loading = false) => {
  const store = createTestStore();
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header loading={loading} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Header Component", () => {
  
  test('renders loading shimmer when loading is true', () => {
    renderHeaderWithStore(true);
    expect(screen.getByTestId("loading-shimmer")).toBeInTheDocument();
  });

  test("renders brand name", () => {
    renderHeaderWithStore();

    expect(screen.getByRole("heading", { name: "BigBite" })).toBeInTheDocument();
  });

  test("displays location text", () => {
    renderHeaderWithStore();

    expect(screen.getByText("Bangalore")).toBeInTheDocument();
  });
});
