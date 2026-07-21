import { fireEvent, render, screen, within } from "@testing-library/react";
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

const mockOpenLocationPanel = jest.fn();

// Mock the custom hooks
jest.mock("../../utils/useLocationDrawer", () => ({
  __esModule: true,
  default: () => ({
    locationSummary: {
      selectedLocationText: "Bangalore",
      selectedLocationAddressText: "HSR Layout, Bangalore",
    },
    openLocationPanel: mockOpenLocationPanel,
    closeLocationPanel: jest.fn(),
    drawer: {
      isOpen: false,
      onClose: jest.fn(),
      searchValue: "",
      onSearchValueChange: jest.fn(),
      onSearchSubmit: jest.fn(),
      onUseCurrentLocation: jest.fn(),
      isLocating: false,
      selectedCityLabel: "",
      cityOptions: [
        { label: "Bangalore, Karnataka" },
        { label: "Pune, Maharashtra" },
        { label: "Delhi, Delhi" },
      ],
      onSelectCity: jest.fn(),
    },
  }),
}));

jest.mock("../../utils/firebase", () => ({}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      theme: themeReducer,
      user: userReducer,
      auth: authReducer,
      search: searchReducer,
    },
    preloadedState: {
      cart: preloadedState.cart ?? { items: [] },
      theme: preloadedState.theme ?? { mode: "light" },
      user: preloadedState.user ?? null,
      auth: preloadedState.auth ?? { open: false, intent: null },
      search: preloadedState.search ?? {
        isSearchOpen: false,
        shouldFocusSearch: false,
      },
    },
  });
};

const renderHeaderWithStore = ({ loading = false, preloadedState } = {}) => {
  const store = createTestStore(preloadedState);
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header loading={loading} />
      </BrowserRouter>
    </Provider>
  );
  return store;
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading shimmer when loading is true", () => {
    renderHeaderWithStore({ loading: true });
    expect(screen.getByTestId("loading-shimmer")).toBeInTheDocument();
  });

  test("renders brand name", () => {
    renderHeaderWithStore();
    expect(screen.getByRole("heading", { name: "BigBite" })).toBeInTheDocument();
  });

  test("displays location text", () => {
    renderHeaderWithStore();
    const locationMatches = screen.getAllByText("Bangalore");
    expect(locationMatches.length).toBeGreaterThan(0);
  });

  test("opens location drawer when location text is clicked", () => {
    renderHeaderWithStore();
    const locationButton = screen.getByRole("button", {
      name: /Bangalore HSR Layout, Bangalore/i,
    });

    fireEvent.click(locationButton);

    expect(mockOpenLocationPanel).toHaveBeenCalledTimes(1);
  });

  test("renders theme change button and toggles theme on click", () => {
    const view = renderHeaderWithStore();
    const themeButton = screen.getByRole("button", { name: /Light|Dark/i });

    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton);

    expect(view.getState().theme.mode).toBe("dark");
  });

  test("opens sign in auth drawer on click", () => {
    const view = renderHeaderWithStore();

    const signInButton = within(screen.getByRole("navigation")).getByRole("button",{ name: /Sign In/i });

    fireEvent.click(signInButton);

    expect(view.getState().auth).toMatchObject({ open: true, intent: "signin" });
  });

  test("opens cart auth drawer when cart is clicked while logged out", () => {
    const view = renderHeaderWithStore();

    const cartButton = within(screen.getByRole("navigation")).getByRole("button",{ name: /Cart/i });

    fireEvent.click(cartButton);

    expect(view.getState().auth).toMatchObject({ open: true, intent: "cart" });
  });

  test("opens search when search button is clicked", () => {
    const view = renderHeaderWithStore();

    const searchButton = within(screen.getByRole("navigation")).getByRole("button",{ name: /Search/i });

    fireEvent.click(searchButton);

    expect(view.getState().search).toMatchObject({
      isSearchOpen: true,
      shouldFocusSearch: true,
    });
  });

  test("shows user profile instead of sign in when logged in", () => {
    renderHeaderWithStore({
      preloadedState: {
        user: {
          uid: "user-1",
          displayName: "Test User",
          email: "test@example.com",
          photoURL: "https://example.com/avatar.png",
        },
      },
    });

    const navigation = screen.getByRole("navigation");

    expect(
      within(navigation).queryByRole("button", { name: /Sign In/i })
    ).not.toBeInTheDocument();
    expect(
      within(navigation).getByRole("button", { name: /Test User/i })
    ).toBeInTheDocument();
  });
});
