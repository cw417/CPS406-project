import styles from '../styles/AccountsOverview.module.css';
import { useState, useEffect } from 'react';
import Account from '../interfaces/Account';

export default function AccountsOverview(props) {

    const customer = props.customer
    const [chequingAccounts, setChequingAccounts] = useState([])
    const [savingAccounts, setSavingAccounts] = useState([])
    
    async function openAccount(type) {
        customer.openAccount(type)
    }

    async function getAccounts(){
        fetch(`http://localhost:5000/account/${customer.id}`).then(response => response.json())
        .then((data) => {
            var cAccounts = []
            var sAccounts = []
            data.forEach((account) => {
                if (account.accountType === 'Chequing'){
                    var tempAccount1 = new Account(account._id, account.accountType, account.customerId,
                        account.accountBalance, account.maxTransferAmount, account.transactionHistory)
                    cAccounts.push(tempAccount1)
                } else {
                    var tempAccount2 = new Account(account._id, account.accountType, account.customerId,
                        account.accountBalance, account.maxTransferAmount, account.transactionHistory)
                    sAccounts.push(tempAccount2)
                }
            })
            setChequingAccounts(cAccounts)
            setSavingAccounts(sAccounts)
        })
    }

    useEffect(() => {
        getAccounts()
    }, [])

    return (
    <>
        <div className={styles.container}>
            <div className={styles.main_header}>
                <h1>Account Overview - {customer.last}, {customer.first}</h1>
            </div>
            <div className={styles.savings}>
                <div className={styles.header}>
                    <h1>Savings Accounts</h1>
                    <button onClick={() => openAccount('Saving')}>Open Account</button>
                </div>
                {savingAccounts.map(sAccount => {
                    return(
                        <>
                            <div key={sAccount.id}>
                                <p>{sAccount.id}</p>
                                <p>${sAccount.accountBalance}</p>
                            </div>
                        </>
                    )
                })}
            </div>

            <div className={styles.chequing}>
                <div className={styles.header}>
                    <h1>Chequing Accounts</h1>
                    <button onClick={() => openAccount('Chequing')}>Open Account</button>
                </div>
                {chequingAccounts.map(cAccount => {
                    return(
                        <>
                            <div key={cAccount.id}>
                                <p>{cAccount.id}</p>
                                <p>${cAccount.accountBalance}</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    </>
    );
}