import { render, fireEvent, screen, renderHook } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import AccountsOverview from "../comps/AccountsOverview";
import QuickActions from "../comps/QuickActions";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

it("renders Dashboard page", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
});

it("renders Loading message if customer is null", () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
