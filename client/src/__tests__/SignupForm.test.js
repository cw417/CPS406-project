import { render, fireEvent, waitFor, getByTestId, screen} from '@testing-library/react';
import SignupForm from '../comps/SignupForm';
import { BrowserRouter } from 'react-router-dom';



it('renders the form elements correctly', () => {
    const { getByPlaceholderText } = 
    render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
   
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Address')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Email')).toBeInTheDocument();
  });


