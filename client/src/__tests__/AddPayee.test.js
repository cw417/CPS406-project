import { render, fireEvent, screen } from "@testing-library/react";
import AddPayee from "../comps/AddPayee";
import { accountCheck } from "../lib/validate";
jest.mock("../lib/validate");
describe("AddPayee", () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
  
    afterEach(() => {
      spy.mockRestore();
    });

  test("renders the Add Payee form", () => {
    const { getByLabelText, getByText } = render(<AddPayee customer={{}} />);
    const payeeNameInput = screen.getByLabelText("Payee Name:");
    const accountNumberInput = screen.getByLabelText("Account Number:");
    const submitButton = screen.getByText("Complete");

    expect(payeeNameInput).toBeInTheDocument();
    expect(accountNumberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

 
  it('should display an alert message if an invalid account number is entered', () => {
    accountCheck.mockResolvedValue(false);
    const spyi = jest.spyOn(window, "alert").mockImplementation(() => {});
    const { getByLabelText, getByText } = render(<AddPayee customer={{}} />);
    const payeeNameInput = getByLabelText('Payee Name:');
    const accountNumberInput = getByLabelText('Account Number:');

    fireEvent.change(payeeNameInput, { target: { value: 'abc' } });
    fireEvent.change(accountNumberInput, { target: { value: '123456' } });

    fireEvent.submit(getByText('Complete'));
    expect(accountCheck).toHaveBeenCalledWith("123456");
    
  });
  it('should display an alert message if an invalid payee name is entered', () => {
    const { getByLabelText, getByText } = render(<AddPayee customer={{}} />);
    const payeeNameInput = getByLabelText('Payee Name:');
    const accountNumberInput = getByLabelText('Account Number:');

    fireEvent.change(payeeNameInput, { target: { value: '123' } });
    fireEvent.change(accountNumberInput, { target: { value: '123456' } });

    fireEvent.submit(getByText('Complete'));

    expect(spy).toHaveBeenCalledWith('Invalid payee name. Payee name can only contain letters, spaces, and hyphens.');
  });
});