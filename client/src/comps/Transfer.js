import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import TransferStyles from "../styles/Transfer.module.css";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import Transaction from "../objects/Transaction";
import Bank from "../objects/Bank";
import Account from "../objects/Account";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

export default function Transfer(props) {
  const customer = props.customer;
  const [fromAccount, setFromAccount] = useState(null);
  const [displayFromAccount, setDisplayFromAccount] =
    useState("Select Account");
  const [toAccount, setToAccount] = useState(null);
  const [isContact, setIsContact] = useState(false);
  const [displayToAccount, setDisplayToAccount] = useState(
    "Select Account/Contact"
  );
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);
  const amountRef = useRef();
  const reserve = new Bank();
  const navigate = useNavigate();

  // Check amount and accounts before completing transfer
  function handleTransfer() {
    const amount = amountRef.current.value;
    if (
      amount > 0 &&
      amount <= fromAccount.maxTransferAmount &&
      fromAccount !== null &&
      toAccount !== null &&
      fromAccount !== toAccount
    ) {
      // Create Transaction Objects
      const fromTransaction = new Transaction(
        -amount,
        fromAccount.accountType,
        toAccount.id,
        fromAccount.id,
        "Transfer"
      );
      if (isContact) {
        // Retrieve the account associated with the contact email and update Account and Transaction Objects
        reserve.getAccountByEmail(toAccount.email).then((data) => {
          const toContact = new Account(
            data._id,
            data.accountType,
            data.customerId,
            data.accountBalance,
            data.maxTransferAmount,
            data.transactionHistory
          );
          const fromTransaction = new Transaction(
            -amount,
            fromAccount.accountType,
            toContact.id,
            fromAccount.id,
            "Transfer"
          );
          const toTransaction = new Transaction(
            amount,
            "Saving",
            toContact.id,
            fromAccount.id,
            "Transfer"
          );
          fromAccount.transfer(
            toContact,
            amount,
            fromTransaction,
            toTransaction
          );
        });
      } else {
        const toTransaction = new Transaction(
          amount,
          toAccount.accountType,
          toAccount.id,
          fromAccount.id,
          "Transfer"
        );
        // Complete a transfer from the customers account
        fromAccount.transfer(toAccount, amount, fromTransaction, toTransaction);
      }
      setTimeout(() => {navigate(0)}, 500)
    }
  }

  // Remove a contact from the customer object
  function deleteContact(contact) {
    customer.removeContact(contact);
    navigate(0);
  }

  return (
    <>
      <div className={TransferStyles.Form}>
        <div className={TransferStyles.FormElement}>
          <div>From: </div>
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
                {displayFromAccount}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className={DropdownStyles.Content}
                align="start"
              >
                <div style={{ overflow: "auto", maxHeight: "130px" }}>
                  {accounts.map((account) => {
                    return (
                      <DropdownMenu.Item
                        className={DropdownStyles.Item}
                        onSelect={() => {
                          setFromAccount(account);
                          setDisplayFromAccount(account.id);
                        }}
                      >
                        <p>
                          {account.accountType} Account - {account.id}
                        </p>
                        <p>${account.accountBalance}</p>
                      </DropdownMenu.Item>
                    );
                  })}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className={TransferStyles.FormElement}>
          <div>To: </div>
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
                {displayToAccount}
              </DropdownMenu.Trigger>
              <NavLink to="/contacts">&emsp;Add Contact</NavLink>
              <DropdownMenu.Content
                className={DropdownStyles.Content}
                align="start"
              >
                <div style={{ overflow: "auto", maxHeight: "130px" }}>
                  {accounts.map((account) => {
                    return (
                      <DropdownMenu.Item
                        className={DropdownStyles.Item}
                        onSelect={() => {
                          setToAccount(account);
                          setDisplayToAccount(account.id);
                          setIsContact(false);
                        }}
                      >
                        <p>
                          {account.accountType} Account - {account.id}
                        </p>
                        <p>${account.accountBalance}</p>
                      </DropdownMenu.Item>
                    );
                  })}
                  {customer.contacts.map((contact) => {
                    return (
                      <DropdownMenu.Item
                        className={DropdownStyles.Item}
                        onSelect={() => {
                          setToAccount(contact);
                          setDisplayToAccount(contact.name);
                          setIsContact(true);
                        }}
                      >
                        <p>
                          Contact - {contact.name} - {contact.email}
                        </p>
                        <MdDeleteForever
                          onClick={() => deleteContact(contact)}
                        />
                      </DropdownMenu.Item>
                    );
                  })}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className={TransferStyles.FormElement}>
          <div>
            <label>Amount: </label>
          </div>
          <div>
            <span>$ </span>
            <input
              ref={amountRef}
              type="number"
              className={TransferStyles.FormInput}
              placeholder="0.00"
            />
          </div>
          <div className={TransferStyles.centerAlignDiv}>
            <button
              onClick={handleTransfer}
              className={TransferStyles.FormButton}
            >
              Make transfer
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
