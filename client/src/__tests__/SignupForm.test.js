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


  test('should show error message when password less than eight Characters', async () => {
    const { getByLabelText, getByText } =   render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
    const Input = screen.getByPlaceholderText('Password');
    fireEvent.change(Input, { target: { value: 'abc' } });
    fireEvent.submit(Input);
    await waitFor(() =>
      expect(getByText('Must be at least 8 characters')).toBeInTheDocument()
    );
  });

  test('should show error message when password does have number or special character', async () => {
    const { getByLabelText, getByText } =   render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
    const Input = screen.getByPlaceholderText('Password');
    fireEvent.change(Input, { target: { value: 'abcdefghi' } });
    fireEvent.submit(Input);
    await waitFor(() =>
      expect(getByText('Password must contain a Number, Special, Uppercase, and Lowercase Character')).toBeInTheDocument()
    );
  });

  test('should show error message when confirm password does not match with password', async () => {
    const { getByLabelText, getByText } =   render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
    const Input = screen.getByPlaceholderText('Confirm Password');
    fireEvent.change(Input, { target: { value: 'abcdefghi' } });
    fireEvent.submit(Input);
    await waitFor(() =>
      expect(getByText('Passwords Do Not Match')).toBeInTheDocument()
    );
  });

  test('should show error message when Email is not correct format', async () => {
    const { getByLabelText, getByText } =   render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
    const Input = screen.getByPlaceholderText('Email');
    fireEvent.change(Input, { target: { value: 'say' } });
    fireEvent.submit(Input);
    await waitFor(() =>
      expect(getByText('Invalid Email Address')).toBeInTheDocument()
    );
  });

  test('should show error message when confirm Email does not match with email', async () => {
    const { getByLabelText, getByText } =   render(
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      );
    const Input = screen.getByPlaceholderText('Confirm Email');
    fireEvent.change(Input, { target: { value: 'invalid' } });
    fireEvent.submit(Input);
    await waitFor(() =>
      expect(getByText('Emails Do Not Match')).toBeInTheDocument()
    );
  });