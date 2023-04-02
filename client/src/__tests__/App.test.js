import { render, screen } from "@testing-library/react";
import AddContact from "../comps/AddContact";
import AddPayee from "../comps/AddPayee";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginForm from "../comps/LoginForm";
import SignupForm from "../comps/SignupForm";

/* SETUP */

// need to mock useNavigate to deal with jest issues
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

/* TESTS */

test("renders App", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test("renders Homepage", async () => {
  render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
  expect(screen.getByText("The Reserve")).toBeInTheDocument();
  // expect(mockedUsedNavigate).toHaveBeenCalledWith('/post-1');
});

test("renders AddContact component", () => {
  render(<AddContact />);
});

test("renders AddPayee component", () => {
  render(<AddPayee />);
});

test("renders LoginForm component", () => {
  <BrowserRouter>
    render(
    <LoginForm />
    );
  </BrowserRouter>;
});
test("renders Signup component", () => {
  <BrowserRouter>
    render(
    <SignupForm />
    );
  </BrowserRouter>;
});
