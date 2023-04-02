import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../comps/Navbar";
import { BrowserRouter } from "react-router-dom";
describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders logo and sign in link when not logged in", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText("The Reserve");
    expect(logo).toBeInTheDocument();
    const signInLink = screen.getByText("Login");
    expect(signInLink).toBeInTheDocument();
  });

  test("renders dashboard link when logged in as admin", () => {
    localStorage.setItem("admin", "true");
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const dashboardLink = screen.getByText("Dashboard");
    expect(dashboardLink).toBeInTheDocument();
    const accountSettingsLink = screen.queryByText("Account Settings");
    expect(accountSettingsLink).not.toBeInTheDocument();
    const signOutLink = screen.getByText("Sign Out");
    expect(signOutLink).toBeInTheDocument();
  });

  test("clicking sign out link removes user id and admin from local storage", () => {
    localStorage.setItem("userId", "123");
    localStorage.setItem("admin", "true");
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const signOutLink = screen.getByText("Sign Out");
    userEvent.click(signOutLink);
    expect(localStorage.getItem("userId")).toBeNull();
    expect(localStorage.getItem("admin")).toBeNull();
    //expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
