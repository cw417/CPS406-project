import Bank from "../objects/Bank"
import { useState, useEffect } from 'react'
import styles from '../styles/AccountInfo.module.css'

export default function AccountInfo(props) {
    const accountId = props.accountId
    const bank = new Bank()
    const [account, setAccount] = useState(null)

    useEffect(() => {
        getAccountInfo(accountId)
    }, [])

    async function getAccountInfo(accountId) {
        bank.getAccount(accountId).then((data) => setAccount(data))
    }

    if (account === null){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>
              {account.accountType} Account - {account._id}
            </p>
            <p>Current Balance: ${account.accountBalance}</p>
          </div>
          <hr />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>To</th>
                <th>From</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {account.transactionHistory.map((transaction) => (
                <tr key={transaction.id} className={styles.row}>
                  <td>{transaction.date}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}