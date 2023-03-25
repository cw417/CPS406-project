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

    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p>{account.accountType} Account - {account._id}</p>
                    <p>Current Balance: ${account.accountBalance}</p>
                </div>
                <hr/>
                <div className={styles.header}>
                    <p>Date</p>
                    <p>To</p>
                    <p>From</p>
                    <p>Description</p>
                    <p>Amount</p>
                </div>
                <div className={styles.body}>
                    {account.transactionHistory.map((transaction) => {
                        return(
                            <>
                                <div className={styles.transaction}>
                                    <p>{transaction.date}</p>
                                    <p>{transaction.to}</p>
                                    <p>{transaction.from}</p>
                                    <p>{transaction.type}</p>
                                    <p>{transaction.amount}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}