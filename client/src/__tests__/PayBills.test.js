import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Customer from '../objects/Customer'
import Account from '../objects/Account';
import PayBills from '../comps/PayBills';

describe('PayBills', () => {
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

  test('renders PayBills component', () => {
    render(<BrowserRouter><PayBills customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    expect(screen.getByText(/from:/i)).toBeInTheDocument();
    expect(screen.getByText(/to:/i)).toBeInTheDocument();
    expect(screen.getByText(/amount:/i)).toBeInTheDocument();
    expect(screen.getByText(/make payment/i)).toBeInTheDocument();
  });

  test('displays accounts', () => {
    render(<BrowserRouter><PayBills customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    expect(screen.getByText('Select Bank Account')).toBeInTheDocument();
    expect(screen.getByText('Select Payee')).toBeInTheDocument();
  })

  test('updates transfer amount when user types in input field', () => {
    render(<BrowserRouter><PayBills customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/0.00/i), {
      target: { value: '100' },
    });
    expect(screen.getByDisplayValue(/100/i)).toBeInTheDocument();
  });

  test('accounts are selectable', () => {
    render(<BrowserRouter><PayBills customer={testCustomer} sAccounts={[sAccount]} cAccounts={[cAccount]} /></BrowserRouter>);
    fireEvent.click(screen.getByText('Select Bank Account'));
    //expect(screen.getByText('1234')).toBeInTheDocument();
  })

})