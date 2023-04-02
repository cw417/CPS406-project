import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeNavbar from "../comps/HomeNavbar";

describe("HomeNavbar", () => {
  test("renders logo and company name", () => {
    render(
      <BrowserRouter>
        <HomeNavbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText("The Reserve");
    expect(logo).toBeInTheDocument();
    const companyName = screen.getByText("The Reserve");
    expect(companyName).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <BrowserRouter>
        <HomeNavbar />
      </BrowserRouter>
    );
    const productsLink = screen.getByText("Our Products");
    expect(productsLink).toBeInTheDocument();
    const featuresLink = screen.getByText("Features");
    expect(featuresLink).toBeInTheDocument();
    const pricingLink = screen.getByText("Pricing");
    expect(pricingLink).toBeInTheDocument();
    const signInLink = screen.getByText("Sign In");
    expect(signInLink).toBeInTheDocument();
    const getStartedLink = screen.getByText("Get Started");
    expect(getStartedLink).toBeInTheDocument();
  });
});
