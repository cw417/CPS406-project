import Bank from "../objects/Bank";
import { useState, useEffect } from "react";
import styles from "../styles/AccountInfo.module.css";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Account from "../objects/Account";

export default function AccountInfo(props) {
  const accountId = props.accountId;
  const bank = new Bank();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(365)
  const currentDate = new Date();
  const userId = localStorage.getItem("userId");
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    getAccountInfo(accountId);
  }, []);

  // Get the account info from the bank
  async function getAccountInfo(accountId) {
    bank.getAccount(accountId).then((data) => setAccount(data));
  }
  
  // Delete a customer account and take the user to the dashboard
  function deleteAccount() {
    const accountObject = new Account(
      account._id,
      account.accountType,
      account.customerId,
      account.accountBalance,
      account.maxTransferAmount,
      account.transactionHistory
    );
    if (account.accountBalance > 0) {
      alert("Account Cannot Be Closed Since Balance Is Greater Than $0");
    } else {
      accountObject.deleteAccount();
      navigate("/dashboard");
    }
  }

  function deleteTransaction(transaction) {
    const accountObject = new Account(
      account._id,
      account.accountType,
      account.customerId,
      account.accountBalance,
      account.maxTransferAmount,
      account.transactionHistory
    );
    accountObject.removeTransaction(transaction)
    navigate(`/accounts/${accountId}`);
  }

  if (account === null) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (userId !== account.customerId && admin === "false"){
    navigate('/dashboard');
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>
            {account.accountType} Account - {account._id}
            <MdDeleteForever
              onClick={() => {
                deleteAccount();
              }}
            />
          </p>
          <p>Current Balance: ${account.accountBalance}</p>
        </div>
        <button className={styles.button} onClick={() => {setFilter(3)}}>Filter Last 3 Days</button>
        <button className={styles.button} onClick={() => {setFilter(10)}}>Filter Last 7 Days</button>
        <button className={styles.button} onClick={() => {setFilter(30)}}>Filter Last 30 Days</button>
        <hr />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>To</th>
              <th>From</th>
              <th>Description</th>
              <th>Amount</th>
              {admin === "true" ? <th>Delete</th> : <></>}
            </tr>
          </thead>
          <tbody>
            {account.transactionHistory.reverse().map((transaction) => (
              parseInt((currentDate -(new Date(transaction.date))) / (1000 * 60 * 60 * 24)) <= filter ?
              <tr key={transaction.id} className={styles.row}>
                <td>{transaction.date}</td>
                <td>{transaction.to}</td>
                <td>{transaction.from}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                {admin === "true" ? <td onClick={() => {deleteTransaction(transaction)}}>🗑️</td> : <></>}
              </tr>
              :  
              <>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
