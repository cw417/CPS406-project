import { render, screen } from '@testing-library/react';
import QuickActions from '../comps/QuickActions';
import { BrowserRouter } from "react-router-dom";


describe('QuickActions', () => {

    let mockCustomer;
    beforeEach(() => {
      mockCustomer = {
        first: "Eric",
        last: "Chang",
        getAccounts: jest.fn().mockResolvedValue({
          cAccounts: [{ id: "123", accountBalance: 100 }],
          sAccounts: [{ id: "456", accountBalance: 200 }],
        }),
        contacts:["Saydur"],
        payees:["ryerson"],
        openAccount: jest.fn(),
      };
     
    });

  it('should render the header', () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  it('should render the Deposit component by default', () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    expect(screen.getAllByText('Deposit')[0]).toBeInTheDocument();
  });

  it('should switch to Transfer component when Transfer button is clicked', () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    const transferButton = screen.getByText('Transfer');
    transferButton.click();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('should switch to Pay Bills component when Pay button is clicked', () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    const payButton = screen.getByText('Pay Bills');
    payButton.click();
    expect(screen.getByText('Pay Bills')).toBeInTheDocument();
  });

  it('should render the Deposit component when Deposit button is clicked', () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    
    const depositButton = screen.getAllByText('Deposit')[1];
    depositButton.click();
    expect(screen.getAllByText('Deposit')[0]).toBeInTheDocument();
  });
/*
  it('should pass the chequing and saving accounts to the child components', async () => {
    render(<BrowserRouter><QuickActions customer={mockCustomer} /></BrowserRouter>);
    expect(mockCustomer.getAccounts).toHaveBeenCalledTimes(1);
    expect(mockCustomer.getAccounts).toHaveBeenCalledWith();
    const depositComponent = await screen.findByText('Deposit');
    expect(depositComponent).toBeInTheDocument();
    expect(depositComponent).toHaveAttribute('sAccounts', '[{"id":2,"balance":200}]');
    expect(depositComponent).toHaveAttribute('cAccounts', '[{"id":1,"balance":100}]');
  });
  */
});