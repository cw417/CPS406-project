import {render, screen, fireEvent} from "@testing-library/react";
import Edit from "../pages/Edit";
import {BrowserRouter} from "react-router-dom";

    test("Renders Edit Page" , () => {
        const {getByLabelText, getByText} = render(<BrowserRouter><Edit customer={{}}/></BrowserRouter>);
        const nameInput = screen.getByLabelText("New Account Name: ");
        const oldPassInput = screen.getByLabelText("Old Password:");
        const newPassInput = screen.getByLabelText("New Password:");
        const confirmNewPassInput = screen.getByLabelText("Re-enter New Password:");
        const emailInput = screen.getByLabelText("New Email Address:");
        const homeAddressInput = screen.getByLabelText("New Home Address:");

        expect(nameInput).toBeInTheDocument();
        expect(oldPassInput).toBeInTheDocument();
        expect(newPassInput).toBeInTheDocument();
        expect(confirmNewPassInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(homeAddressInput).toBeInTheDocument();

    });

    test("Displays Error Message when new Password is Invalid", () => {
        const {getByLabelText, getByText} = render(<BrowserRouter><Edit customer={{}}/></BrowserRouter>);
        const newPasswordInput = screen.getByLabelText("New Password: ");

        fireEvent.change(newPasswordInput, {target: {value: "Password123!"}});

        const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        expect(passwordRegex.test(newPasswordInput.value)).toBe(true);

    });


    test("Displays Error Message when second enter of password is not the same as new", () => {
        const {getByLabelText, getByText} = render(<BrowserRouter><Edit customer={{}}/></BrowserRouter>);
        const newPasswordInput = screen.getByLabelText("New Password: ");
        const confirmNewPasswordInput = screen.getByLabelText("Re-enter New Password: ")

        const pas = Edit.newPass;

        fireEvent.change(newPasswordInput, {target: {pas}});
        fireEvent.change(confirmNewPasswordInput, {target: {pas}});

        expect(newPasswordInput).toBeInTheDocument();
        expect(confirmNewPasswordInput).toBeInTheDocument();

        expect(newPasswordInput).toEqual(confirmNewPasswordInput);

    });



    test('Display an error message if the email address entered is invalid', () => {
        const {getByLabelText, getByText} = render(<BrowserRouter><Edit customer={{}}/></BrowserRouter>);
        const contactNameInput = screen.getByLabelText("Name:");
        const emailInput = screen.getByLabelText("Email:");

        fireEvent.change(contactNameInput,{target: {value: "abcdefg" }});
        fireEvent.change(emailInput, {target: {value: "test@example.com"}});

    });

    test('Display an error message if the second email address does not match the first', () => {
        const {getByLabelText, getByText} = render(<BrowserRouter><Edit customer={{}}/></BrowserRouter>);
        const emailInput = screen.getByLabelText("Email:");
        const confirmEmailInput = screen.getByLabelText("Confirm Email:");

        const ead = AddContact.email;

        fireEvent.change(emailInput, {target: {ead}});
        fireEvent.change(confirmEmailInput, {target: {ead}});

        expect(emailInput).toBeInTheDocument();
        expect(confirmEmailInput).toBeInTheDocument();

        expect(emailInput).toEqual(confirmEmailInput);

    });
