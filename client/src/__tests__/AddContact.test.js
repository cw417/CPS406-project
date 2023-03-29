import {render, screen, fireEvent} from '@testing-library/react';
import AddContact from  '../comps/AddContact';
jest.mock("../lib/validate");

    test('Render the Add Contact component', () => {
        const {getByLabelText, getByText} = render(<AddContact customer ={{}}/>);
        const contactNameInput = screen.getByLabelText("Name:");
        const emailInput = screen.getByLabelText("Email:");
        const completeButton = screen.getByText("Complete");

        expect(contactNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(completeButton).toBeInTheDocument();
    });

    test('Display an error message if the email address entered is invalid', () => {
        const {getByLabelText, getByText} = render(<AddContact customer={{}}/>);
        const contactNameInput = screen.getByLabelText("Name:");
        const emailInput = screen.getByLabelText("Email:");

        fireEvent.change(contactNameInput,{target: {value: "abcdefg" }});
        fireEvent.change(emailInput, {target: {value: "test@example.com"}});

        fireEvent.submit(getByText("Complete"));

    });

    test('Display an error message if the second email address does not match the first', () => {
        const {getByLabelText, getByText} = render(<AddContact customer ={{}}/>);
        const emailInput = screen.getByLabelText("Email:");
        const confirmEmailInput = screen.getByLabelText("Confirm Email:");

        const ead = AddContact.email;

        fireEvent.change(emailInput, {target: {ead}});
        fireEvent.change(confirmEmailInput, {target: {ead}});

        expect(emailInput).toBeInTheDocument();
        expect(confirmEmailInput).toBeInTheDocument();

        expect(emailInput).toEqual(confirmEmailInput);

    })