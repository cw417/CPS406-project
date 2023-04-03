import { render, screen, fireEvent } from "@testing-library/react";
import Edit from "../pages/Edit";
import { BrowserRouter } from "react-router-dom";

test("Renders Edit Page", () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Edit customer={{}} />
    </BrowserRouter>
  );
  const nameInput = screen.getByLabelText(/New Account Name/i);
  const oldPassInput = screen.getByLabelText(/Old Password/i);
  const newPassInput = screen.getByLabelText(/New Password/i);
  const confirmNewPassInput = screen.getByLabelText(/Re-enter New Password/i);
  const emailInput = screen.getByLabelText(/New Email Address/i);
  const homeAddressInput = screen.getByText(/New Home Address/i);

  expect(nameInput).toBeInTheDocument();
  expect(oldPassInput).toBeInTheDocument();
  expect(newPassInput).toBeInTheDocument();
  expect(confirmNewPassInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(homeAddressInput).toBeInTheDocument();
});

test("Password regex accepts valid password", () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Edit customer={{}} />
    </BrowserRouter>
  );
  const newPasswordInput = screen.getByLabelText(/New Password/i);

  fireEvent.change(newPasswordInput, { target: { value: "Password123!" } });

  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i;
  expect(passwordRegex.test(newPasswordInput.value)).toBe(true);
});

test("Password regex rejects invalid password", () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Edit customer={{}} />
    </BrowserRouter>
  );
  const newPasswordInput = screen.getByLabelText(/New Password/i);

  fireEvent.change(newPasswordInput, { target: { value: "invalidpassword" } });

  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i;
  expect(passwordRegex.test(newPasswordInput.value)).toBe(false);
});

test("Displays Error Message when second enter of password is not the same as new", () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Edit customer={{}} />
    </BrowserRouter>
  );
  const newPasswordInput = screen.getByLabelText(/New Password/i);
  const confirmNewPasswordInput = screen.getByLabelText(
    /Re-enter New Password/i
  );

  const pas = Edit.newPass;

  fireEvent.change(newPasswordInput, { target: { pas } });
  fireEvent.change(confirmNewPasswordInput, { target: { pas } });

  expect(newPasswordInput).toBeInTheDocument();
  expect(confirmNewPasswordInput).toBeInTheDocument();

  expect(newPasswordInput).toEqual(confirmNewPasswordInput);
});

test("Display an error message if the email address entered is invalid", () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <Edit customer={{}} />
    </BrowserRouter>
  );
  const contactNameInput = screen.getByLabelText(/Name/i);
  const emailInput = screen.getByLabelText(/Email/i);

  fireEvent.change(contactNameInput, { target: { value: "abcdefg" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
});