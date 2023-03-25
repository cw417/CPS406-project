import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import TransferStyles from "../styles/Transfer.module.css";
import { useRef, useState } from "react";
import Transaction from "../objects/Transaction";

export default function Transfer(props) {
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [selectedFromAccount, setSelectedFromAccount] = useState(null);
  const [selectedToAccount, setSelectedToAccount] = useState(null);
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);
  const amountRef = useRef();

  function handleTransfer() {
    const amount = amountRef.current.value;
    const newTransaction = new Transaction(
      amount,
      "TRANSFER",
      toAccount,
      fromAccount
    );
    console.log(amount);
  }

  return (
    <>
      <div>
        <h1>Transfer</h1>
      </div>
      <div>
        <span>From: </span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
            {selectedFromAccount
              ? `${selectedFromAccount.accountType} Account - ${selectedFromAccount.id}`
              : "Select Account"}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className={DropdownStyles.Content}
            align="start"
          >
            {accounts.map((account) => {
              return (
                <DropdownMenu.Item
                  className={DropdownStyles.Item}
                  onSelect={() => {
                    setFromAccount(account.id);
                    setSelectedFromAccount(account);
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
      </div>
      <div>
        <span>To: </span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
            {selectedToAccount
              ? `${selectedToAccount.accountType} Account - ${selectedToAccount.id}`
              : "Select Account"}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className={DropdownStyles.Content}
            align="start"
          >
            {accounts.map((account) => {
              return (
                <DropdownMenu.Item
                  className={DropdownStyles.Item}
                  onSelect={() => {
                    setToAccount(account.id);
                    setSelectedToAccount(account);
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
      </div>

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
