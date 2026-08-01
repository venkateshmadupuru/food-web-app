import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import LocationDrawer from "./LocationDrawer";
import useLocationDrawer from "../../utils/useLocationDrawer";
import locationReducer from "../../utils/locationSlice";

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      location: locationReducer,
    },
    preloadedState: {
      location: preloadedState.location ?? {
        selectedLocation: {
          label: "Bengaluru, Karnataka",
          address: "Bengaluru, Karnataka, India",
          lat: "12.9716",
          lng: "77.5946",
          displayLabel: "Bengaluru",
        },
      },
    },
  });

const renderLocationDrawer = (preloadedState = {}) => {
  const store = createTestStore(preloadedState);

  render(
    <Provider store={store}>
      <TestHarness />
    </Provider>,
  );

  return store;
};

const renderDrawer = (drawerProps = {}) =>
  render(
    <LocationDrawer
      drawer={{
        isOpen: true,
        cityOptions: [],
        ...drawerProps,
      }}
    />,
  );

const TestHarness = () => {
  const { openLocationPanel, closeLocationPanel, drawer } = useLocationDrawer();

  return (
    <>
      <button type="button" onClick={openLocationPanel}>
        Open location drawer
      </button>
      <LocationDrawer drawer={drawer} />
      <button type="button" onClick={closeLocationPanel}>
        Close location drawer
      </button>
    </>
  );
};

describe("LocationDrawer", () => {
  test("opens from a real hook state and closes with the drawer close button", () => {
    renderLocationDrawer();

    fireEvent.click(
      screen.getByRole("button", { name: /open location drawer/i }),
    );

    expect(
      screen.getByRole("complementary", {
        name: /location drawer/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Popular cities/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mumbai/i })).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /close location drawer/i }),
    );

    expect(
      screen.queryByRole("complementary", {
        name: /location drawer/i,
      }),
    ).not.toBeInTheDocument();
  });

  test("focuses the search input when opened", () => {
    renderLocationDrawer();

    fireEvent.click(
      screen.getByRole("button", { name: /open location drawer/i }),
    );

    expect(screen.getByPlaceholderText(/search for a city/i)).toHaveFocus();
  });

  test("closes when the overlay is clicked", () => {
    renderLocationDrawer();

    fireEvent.click(
      screen.getByRole("button", { name: /open location drawer/i }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /close location selection/i,
      }),
    );

    expect(
      screen.queryByRole("complementary", {
        name: /location drawer/i,
      }),
    ).not.toBeInTheDocument();
  });

  test("calls onUseCurrentLocation when current location button is clicked", () => {
    const onUseCurrentLocation = jest.fn();

    renderDrawer({ onUseCurrentLocation });

    fireEvent.click(
      screen.getByRole("button", { name: /get current location/i }),
    );

    expect(onUseCurrentLocation).toHaveBeenCalledTimes(1);
  });

  test("calls onSelectCity when a city is selected", () => {
    const onSelectCity = jest.fn();

    renderDrawer({ onSelectCity, cityOptions: [{ label: "Mumbai, Maharashtra" }] });

    fireEvent.click(screen.getByRole("button", { name: /Mumbai/i }));

    expect(onSelectCity).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "Mumbai, Maharashtra",
      }),
    );
  });

  test("shows empty state when no cities are available", () => {
    renderDrawer({ cityOptions: [] });

    expect(
      screen.getByText(/no city matches your search/i),
    ).toBeInTheDocument();
  });
});
