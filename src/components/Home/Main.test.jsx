import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useRestaurants from "../../hooks/useRestaurants";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../hooks/useOnlineStatus", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../hooks/useRestaurants", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Shimmer/Shimmer.jsx", () => ({
  __esModule: true,
  default: () => <div data-testid="shimmer" />,
}));

const mockedUseDispatch = useDispatch;
const mockedUseSelector = useSelector;
const mockedUseOnlineStatus = useOnlineStatus;
const mockedUseRestaurants = useRestaurants;

const renderMain = ({ loading = false, error = null } = {}) => {
  mockedUseSelector.mockImplementation((selector) =>
    selector({
      search: {
        isSearchOpen: false,
        shouldFocusSearch: false,
      },
      location: {
        selectedLocation: null,
      },
    }),
  );

  mockedUseRestaurants.mockReturnValue({
    restaurants: [],
    imageGrids: [],
    loading,
    error,
  });

  return render(<Main />);
};

beforeEach(() => {
  jest.clearAllMocks();

  mockedUseDispatch.mockReturnValue(jest.fn());
  mockedUseOnlineStatus.mockReturnValue(true);
});

describe("Main component", () => {
  test("shows the offline message when the app is offline", () => {
    mockedUseOnlineStatus.mockReturnValue(false);

    renderMain();

    expect(
      screen.getByText(/Network Error, Please check network connection/i),
    ).toBeInTheDocument();
  });

  test("shows shimmer while restaurants are loading", () => {
    renderMain({ loading: true });

    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("shows an error message when restaurant data fails to load", () => {
    renderMain({ error: "Failed to fetch" });

    expect(screen.getByText(/Unable to load restaurants/i)).toBeInTheDocument();
  });
});
