import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Transfer from '../comps/Transfer';
import Customer from '../objects/Customer'
import Account from '../objects/Account';

describe('Transfer', () => {
  const testCustomer = new Customer(
    'testUser',
    'testFirst',
    'testLast',
    'testAddress',
    'testEmail',
    'testPassword1!',
    [], []);
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

  test('renders Transfer component', () => {
    render(<BrowserRouter><Transfer customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    expect(screen.getByText(/from:/i)).toBeInTheDocument();
    expect(screen.getByText(/to:/i)).toBeInTheDocument();
    expect(screen.getByText(/amount:/i)).toBeInTheDocument();
    expect(screen.getByText(/make transfer/i)).toBeInTheDocument();
  });

  test('displays accounts', () => {
    render(<BrowserRouter><Transfer customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    expect(screen.getByText("Select Account")).toBeInTheDocument();
    expect(screen.getByText("Select Account/Contact")).toBeInTheDocument();
  })

});
