import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import TransferStyles from "../styles/Transfer.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function PayBills(props) {
  const customer = props.customer   
  const sAccounts = props.sAccounts
  const cAccounts = props.cAccounts
  const accounts = sAccounts.concat(cAccounts)
  const payees = [{id: 1242, name: "Walmart"}];
  
  const [displayedAccount, setDisplayedAccount] = useState('Select Bank Account')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [payAmount, setPayAmount] = useState(0);
  const [displayedPayee, setDisplayedPayee] = useState('Select Payee')
  const [selectedPayee, setSelectedPayee] = useState(null)

  function payBill() {
    if (payAmount > 0 && selectedAccount !== null) {
      console.log("Pay");
    }
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
                {payees.map((payee) => {
                  return (
                    <>
                      <DropdownMenu.Item
                        className={DropdownStyles.Item}
                        onSelect={() => {
                          setDisplayedPayee(payee.id);
                          setSelectedPayee(payee);
                        }}
                      >
                        <p>
                          {payee.name} - {payee.id}
                        </p>
                      </DropdownMenu.Item>
                    </>
                  );
                })}
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
