import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import { useState } from "react";
import Transaction from "../objects/Transaction";
import TransferStyles from "../styles/Transfer.module.css";

export default function Deposit(props) {
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);

  const [displayedAccount, setDisplayedAccount] = useState("Select Account");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);

  function makeDeposit() {
    if (depositAmount > 0 && selectedAccount !== null) {
      const transaction = new Transaction(
        depositAmount,
        selectedAccount.accountType,
        selectedAccount.id,
        "Cheque",
        "Deposit"
      );
      selectedAccount.deposit(depositAmount, transaction);
    }
  }

  return (
    <>
      <div className={TransferStyles.Form}>
        <div className={TransferStyles.FormElement}>
          <div>Upload your cheque:</div>
          <div>
            <div>
              <input
                type="file"
                placeholder="Add Image"
                className={TransferStyles.InputButton}
              />
            </div>
          </div>
        </div>
        <div className={TransferStyles.FormElement}>
          <div>Deposit to: </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className={DropdownStyles.Trigger}>
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
        <div className={TransferStyles.FormElement}>
          <div>
            <label>Amount:</label>
          </div>
          <div>
            <span>$ </span>
            <input
              type="number"
              onChange={(event) => setDepositAmount(event.target.value)}
              className={TransferStyles.FormInput}
              placeholder="0.00"
            />
          </div>
          <div className={TransferStyles.centerAlignDiv}>
            <button
              type="submit"
              onClick={makeDeposit}
              className={TransferStyles.FormButton}
            >
              Make deposit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
