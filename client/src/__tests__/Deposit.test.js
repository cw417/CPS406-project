import { render, screen, fireEvent } from '@testing-library/react';
import Deposit from '../comps/Deposit';
import { BrowserRouter } from 'react-router-dom';
import Account from "../objects/Account";
import Transaction from "../objects/Transaction";
describe('Deposit', () => {
    const sAccount = new Account(
        "1234",
        "Saving",
        "c-1234",
        1000,
        500,
        []
      );
      const cAccount = new Account(
        "5678",
        "Chequing",
        "c-1234",
        2000,
        1000,
        []
      );
      const accounts = [sAccount, cAccount];
  test('renders the deposit form', () => {
    render(<BrowserRouter><Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    expect(screen.getByText(/upload your cheque/i)).toBeInTheDocument();
    expect(screen.getByText(/deposit to:/i)).toBeInTheDocument();
    expect(screen.getByText(/amount:/i)).toBeInTheDocument();
  });
/*
  test('displays account options in dropdown', () => {
    render(<BrowserRouter><Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    fireEvent.click(screen.getByText(/select account/i));
    expect(screen.getByText(/Saving Account - 1234/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1000/i)).toBeInTheDocument();
    expect(screen.getByText(/Chequing Account - 5678/i)).toBeInTheDocument();
    expect(screen.getByText(/\$500/i)).toBeInTheDocument();
  });

  test('updates selected account and displayed account when account is selected from dropdown', () => {
    render(<BrowserRouter><Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    fireEvent.click(screen.getByText(/select account/i));
    fireEvent.click(screen.getByText(/Saving Account - 001/i));
    expect(screen.getByText(/001/i)).toBeInTheDocument();
    
  });
*/
  test('updates deposit amount when user types in input field', () => {
    render(<BrowserRouter><Deposit sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/0.00/i), {
      target: { value: '100' },
    });
    expect(screen.getByDisplayValue(/100/i)).toBeInTheDocument();
  });
/*
  test('makes deposit when make deposit button is clicked with valid input', () => {
    render(<BrowserRouter><Deposit {...props} /></BrowserRouter>);
    fireEvent.click(screen.getByText(/select account/i));
    fireEvent.click(screen.getByText(/savings account - sa001/i));
    fireEvent.change(screen.getByPlaceholderText(/0.00/i), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByText(/make deposit/i));
    expect(sAccounts[0].deposit).toHaveBeenCalledWith(
      100,
      expect.any(Object),
    );
  });

  test('displays error message when make deposit button is clicked with invalid input', () => {
    render(<BrowserRouter><Deposit {...props} /></BrowserRouter>);
    fireEvent.click(screen.getByText(/make deposit/i));
    expect(screen.getByText(/invalid deposit/i)).toBeInTheDocument();
  });
  */
});






