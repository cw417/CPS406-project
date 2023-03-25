import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import { useRef, useState } from "react";
import Transaction from "../objects/Transaction";

export default function Transfer(props) {
  const [fromAccount, setFromAccount] = useState(null);
  const [displayFromAccount, setDisplayFromAccount] =
    useState("Select Account");
  const [toAccount, setToAccount] = useState(null);
  const [displayToAccount, setDisplayToAccount] = useState("Select Account");
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);
  const amountRef = useRef();

  function handleTransfer() {
    const amount = amountRef.current.value;
    if (
      amount > 0 &&
      fromAccount !== null &&
      toAccount !== null &&
      fromAccount !== toAccount
    ) {
      const fromTransaction = new Transaction(
        amount,
        fromAccount.accountType,
        toAccount.id,
        fromAccount.id,
        "Transfer"
      );
      const toTransaction = new Transaction(
        amount,
        toAccount.accountType,
        toAccount.id,
        fromAccount.id,
        "Transfer"
      );
      fromAccount.transfer(toAccount, amount, fromTransaction, toTransaction);
    }
  }

  return (
    <>
      <h1>Transfer</h1>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
          From: {displayFromAccount}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={DropdownStyles.Content} align="start">
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
                <p>{account.accountBalance}</p>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
          To: {displayToAccount}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={DropdownStyles.Content} align="start">
          {accounts.map((account) => {
            return (
              <DropdownMenu.Item
                className={DropdownStyles.Item}
                onSelect={() => {
                  setToAccount(account);
                  setDisplayToAccount(account.id);
                }}
              >
                <p>
                  {account.accountType} Account - {account.id}
                </p>
                <p>{account.accountBalance}</p>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <div>
        <label>Amount: </label>
        <input ref={amountRef} type="text" />
        <div>
          <button onClick={handleTransfer}>Transfer</button>{" "}
        </div>
      </div>
    </>
  );
}
