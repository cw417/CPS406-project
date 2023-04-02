import { render, fireEvent, screen, act } from "@testing-library/react";
import AccountsOverview from "../comps/AccountsOverview";
import { BrowserRouter } from "react-router-dom";
describe("AccountsOverview", () => {
  let mockCustomer;
  beforeEach(() => {
    mockCustomer = {
      first: "Eric",
      last: "Chang",
      getAccounts: jest.fn().mockResolvedValue({
        cAccounts: [{ id: "123", accountBalance: 100 }],
        sAccounts: [{ id: "456", accountBalance: 200 }],
      }),
      openAccount: jest.fn(),
    };
  });

  it("should render the component", () => {
    render(
      <BrowserRouter>
        <AccountsOverview customer={mockCustomer} />{" "}
      </BrowserRouter>
    );
    expect(screen.getByText(/Account Overview/)).toBeInTheDocument();
  });
  it("should open a saving account", async () => {
    render(
      <BrowserRouter>
        <AccountsOverview customer={mockCustomer} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText("Open Account")[0]);

    expect(mockCustomer.openAccount).toHaveBeenCalledWith("Saving");
  });
  it("opens a new chequing account", async () => {
    render(
      <BrowserRouter>
        <AccountsOverview customer={mockCustomer} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText("Open Account")[1]);

    expect(mockCustomer.openAccount).toHaveBeenCalledWith("Chequing");
  });

  //work on display an error message when multiple account is opened like more than 8
});
