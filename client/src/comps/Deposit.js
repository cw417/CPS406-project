import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownStyles from "../styles/DropdownMenu.module.css";
import { useState } from "react";
import Transaction from "../objects/Transaction";
import TransferStyles from "../styles/Transfer.module.css";
import { useNavigate } from "react-router-dom";

export default function Deposit(props) {
  const sAccounts = props.sAccounts;
  const cAccounts = props.cAccounts;
  const accounts = sAccounts.concat(cAccounts);

  const [displayedAccount, setDisplayedAccount] = useState("Select Account");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const navigate = useNavigate();

  // Validate deposit amount and account
  function makeDeposit() {
    if (
      depositAmount > 0 &&
      depositAmount <= 10000 &&
      selectedAccount !== null
    ) {
      // Create a transaction object
      const transaction = new Transaction(
        depositAmount,
        selectedAccount.accountType,
        selectedAccount.id,
        "Cheque",
        "Deposit"
      );
      // Pass deposit info to the selected account
      selectedAccount.deposit(depositAmount, transaction);
      navigate(0);
    } else {
      alert(
        "Invalid Deposit - Amount Must Not Exceed $10000 or Account Is Not Selected"
      );
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
              onChange={(event) => {
                setDepositAmount(event.target.value);
                console.log("Changing");
              }}
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
