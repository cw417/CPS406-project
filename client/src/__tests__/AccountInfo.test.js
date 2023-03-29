import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountInfo from '../comps/AccountInfo';

import { BrowserRouter } from 'react-router-dom';


  it('renders loading message when account is null', () => {
    render(<BrowserRouter><AccountInfo accountId="1" /></BrowserRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

