import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  screen,
} from "@testing-library/react";
import LoginForm from "../comps/LoginForm";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

test("should show error message when username is empty", async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const usernameInput = screen.getByPlaceholderText("Username");
  fireEvent.change(usernameInput, { target: { value: "" } });
  fireEvent.submit(usernameInput);
  await waitFor(() =>
    expect(getByText("Please Enter a Username")).toBeInTheDocument()
  );
});

test("should show error message when password is empty", async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "" } });
  fireEvent.submit(passwordInput);
  await waitFor(() =>
    expect(getByText("Please Enter a Password")).toBeInTheDocument()
  );
});

test("should show error message when username does not exist in the database", async () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  const usernameInput = screen.getByPlaceholderText("Username");
  fireEvent.change(usernameInput, { target: { value: "unknown" } });
  fireEvent.submit(usernameInput);
  await waitFor(() =>
    expect(getByText("User Does Not Exist")).toBeInTheDocument()
  );
});
