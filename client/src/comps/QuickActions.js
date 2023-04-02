import styles from "../styles/QuickActions.module.css";
import { useState, useEffect } from "react";
import Transfer from "../comps/Transfer";
import PayBills from "../comps/PayBills";
import Deposit from "../comps/Deposit";

export default function QuickActions(props) {
  const customer = props.customer;
  const [chequingAccounts, setChequingAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);

  async function getAccounts() {
    customer.getAccounts().then((accounts) => {
      setChequingAccounts(accounts.cAccounts);
      setSavingAccounts(accounts.sAccounts);
    });
  }

  useEffect(() => {
    getAccounts();
  }, []);

  const [currentAction, setCurrentAction] = useState("Deposit");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Quick Actions</h1>
          <h1>{currentAction}</h1>
        </div>
        <div className={styles.options}>
          <button
            className={styles.button}
            onClick={() => setCurrentAction("Transfer")}
          >
            Transfer
          </button>
          <button
            className={styles.button}
            onClick={() => setCurrentAction("Pay")}
          >
            Pay Bills
          </button>
          <button
            className={styles.button}
            onClick={() => setCurrentAction("Deposit")}
          >
            Deposit
          </button>
        </div>
        {currentAction === "Deposit" ? (
          <Deposit sAccounts={savingAccounts} cAccounts={chequingAccounts} />
        ) : (
          <></>
        )}
        {currentAction === "Transfer" ? (
          <Transfer
            customer={customer}
            sAccounts={savingAccounts}
            cAccounts={chequingAccounts}
          />
        ) : (
          <></>
        )}
        {currentAction === "Pay" ? (
          <PayBills
            customer={customer}
            sAccounts={savingAccounts}
            cAccounts={chequingAccounts}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
