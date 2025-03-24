import { render, screen, fireEvent } from "@testing-library/react";
import Deposit from "../comps/Deposit";
import { BrowserRouter } from "react-router-dom";
import Account from "../objects/Account";
import Transaction from "../objects/Transaction";
describe("Deposit", () => {
  const sAccount = new Account("1234", "Saving", "c-1234", 1000, 500, []);
  const cAccount = new Account("5678", "Chequing", "c-1234", 2000, 1000, []);
  const accounts = [sAccount, cAccount];
  test("renders the deposit form", () => {
    render(
      <BrowserRouter>
        <Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/upload your cheque/i)).toBeInTheDocument();
    expect(screen.getByText(/deposit to:/i)).toBeInTheDocument();
    expect(screen.getByText(/amount:/i)).toBeInTheDocument();
  });
  
  test("updates deposit amount when user types in input field", () => {
    render(
      <BrowserRouter>
        <Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/0.00/i), {
      target: { value: "100" },
    });
    expect(screen.getByDisplayValue(/100/i)).toBeInTheDocument();
  });
 
});
