import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountInfo from '../comps/AccountInfo';
import Bank from '../objects/Bank';
import { BrowserRouter } from 'react-router-dom';




describe('AccountInfo', () => {
    let mockAccount;
    beforeEach(() => {
    const mockAccount = {
      _id: '123',
      accountType: 'Chequing',
      customerId: '456',
      accountBalance: 100,
      maxTransferAmount: 1000,
      transactionHistory: [
        {
          id: '789',
          date: '2022-04-01',
          to: 'Jane Doe',
          from: 'John Smith',
          type: 'Transfer',
          amount: 50,
        },
        {
          id: '012',
          date: '2022-03-31',
          to: '',
          from: 'John Smith',
          type: 'Deposit',
          amount: 100,
        },
      ],
     
    };
  
    const mockNavigate = jest.fn();
  
   
     
    });
  
    it('renders correctly when account is null', () => {
      render(<BrowserRouter><AccountInfo accountId="123" /></BrowserRouter>);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  /*
    it('renders correctly when account is not null', () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockAccount),
      });
      render(<BrowserRouter><AccountInfo accountId="123" /></BrowserRouter>);
      expect(screen.getByText(/chequing account - 123/i)).toBeInTheDocument();
      expect(screen.getByText(/\$100/i)).toBeInTheDocument();
      expect(screen.getByText(/2022-04-01/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/transfer/i)).toBeInTheDocument();
      expect(screen.getByText(/\$50/i)).toBeInTheDocument();
    });
  
    it('calls deleteAccount function when delete icon is clicked and account balance is 0', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockAccount),
      });
      render(<BrowserRouter><AccountInfo accountId="123" navigate={mockNavigate} /></BrowserRouter>);
      const deleteIcon = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteIcon);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
    */
});

