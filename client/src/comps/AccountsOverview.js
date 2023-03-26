import styles from "../styles/AccountsOverview.module.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function AccountsOverview(props) {
  const customer = props.customer;
  const [chequingAccounts, setChequingAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);

  async function openAccount(type) {
    if (savingAccounts.length + chequingAccounts.length > 8){
      alert("Account Limit Reached");
    } else {
      customer.openAccount(type);
    }
  }

  async function getAccounts() {
    customer.getAccounts().then((accounts) => {
      setChequingAccounts(accounts.cAccounts);
      setSavingAccounts(accounts.sAccounts);
    });
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main_header}>
          <h1>
            Account Overview - {customer.last}, {customer.first}
          </h1>
        </div>
        <div className={styles.savings}>
          <div className={styles.header}>
            <h1>Savings Accounts</h1>
            <button
              onClick={() => openAccount("Saving")}
              className={styles.btn_black}
            >
              Open Account
            </button>
          </div>
          <div className={styles.scrollable_div}>
            {savingAccounts.map((sAccount) => {
              return (
                <>
                  <div className={styles.account} key={sAccount.id}>
                    <div>
                      <span>Acc. Number:{sAccount.id}</span>
                    </div>
                    <div className={styles.pushToLeft}>
                      <p>${sAccount.accountBalance}</p>
                      <NavLink
                        to={`/accounts/${sAccount.id}`}
                        className={styles.viewTrans}
                      >
                        View transactions
                      </NavLink>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <br></br>

        <div className={styles.chequing}>
          <div className={styles.header}>
            <h1>Chequing Accounts</h1>
            <button
              onClick={() => openAccount("Chequing")}
              className={styles.btn_black}
            >
              Open Account
            </button>
          </div>
          <div className={styles.scrollable_div}>
            {chequingAccounts.map((cAccount) => {
              return (
                <>
                  <div className={styles.account} key={cAccount.id}>
                    <div>
                      <p>Acc. Number: {cAccount.id}</p>
                    </div>
                    <div className={styles.pushToLeft}>
                      <p>${cAccount.accountBalance}</p>
                      <NavLink
                        to={`/accounts/${cAccount.id}`}
                        className={styles.viewTrans}
                      >
                        View transactions
                      </NavLink>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
