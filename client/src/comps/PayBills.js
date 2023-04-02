import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import TransferStyles from "../styles/Transfer.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Transaction from "../objects/Transaction";
import Bank from "../objects/Bank";
import Account from "../objects/Account";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

export default function PayBills(props) {
  const customer = props.customer;
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);
  const reserve = new Bank();
  const navigate = useNavigate();

  const [displayedAccount, setDisplayedAccount] = useState(
    "Select Bank Account"
  );
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  const [displayedPayee, setDisplayedPayee] = useState("Select Payee");
  const [selectedPayee, setSelectedPayee] = useState(null);

  function payBill() {
    if (payAmount > 0 && selectedAccount !== null) {
      reserve.getAccount(selectedPayee.accountNumber).then((data) => {
        const toAccount = new Account(
          data._id,
          data.accountType,
          data.customerId,
          data.accountBalance,
          data.maxTransferAmount,
          data.transactionHistory
        );
        const fromTransaction = new Transaction(
          -payAmount,
          selectedAccount.accountType,
          toAccount.id,
          selectedAccount.id,
          "Payment"
        );
        const toTransaction = new Transaction(
          payAmount,
          "Saving",
          toAccount.id,
          selectedAccount.id,
          "Payment"
        );
        selectedAccount.transfer(
          toAccount,
          payAmount,
          fromTransaction,
          toTransaction
        );
      });
      navigate(0);
    }
  }

  function deletePayee(payee) {
    customer.removePayee(payee);
    navigate(0);
  }

  return (
    <>
      <div className={TransferStyles.Form}>
        <div className={TransferStyles.FormElement}>
          <div>From:</div>
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
                {" "}
                {displayedAccount}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className={DropdownStyles.Content}
                align="start"
              >
                <div style={{ overflow: "auto", maxHeight: "130px" }}>
                  {accounts.map((account) => {
                    return (
                      <>
                        <DropdownMenu.Item
                          className={DropdownStyles.Item}
                          onSelect={() => {
                            setDisplayedAccount(account.id);
                            setSelectedAccount(account);
                          }}
                        >
                          <p>
                            {account.accountType} Account - {account.id}
                          </p>
                          <p>${account.accountBalance}</p>
                        </DropdownMenu.Item>
                      </>
                    );
                  })}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className={TransferStyles.FormElement}>
          <div>To:</div>
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
                {displayedPayee}
              </DropdownMenu.Trigger>
              <NavLink to="/contacts">&emsp;Add Payee</NavLink>
              <DropdownMenu.Content
                className={DropdownStyles.Content}
                align="start"
              >
                <div style={{ overflow: "auto", maxHeight: "130px" }}>
                  {customer.payees.map((payee) => {
                    return (
                      <>
                        <DropdownMenu.Item
                          className={DropdownStyles.Item}
                          onSelect={() => {
                            setDisplayedPayee(payee.name);
                            setSelectedPayee(payee);
                          }}
                        >
                          <p>
                            {payee.name} - {payee.accountNumber}
                          </p>
                          <MdDeleteForever onClick={() => deletePayee(payee)} />
                        </DropdownMenu.Item>
                      </>
                    );
                  })}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className={TransferStyles.FormElement}>
          <div>
            <label>Amount:</label>
          </div>
          <div>
            <span>$ </span>
            <input
              type="number"
              onChange={(event) => setPayAmount(event.target.value)}
              className={TransferStyles.FormInput}
              placeholder="0.00"
            />
          </div>
          <div className={TransferStyles.centerAlignDiv}>
            <button
              type="submit"
              onClick={payBill}
              className={TransferStyles.FormButton}
            >
              Make payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
