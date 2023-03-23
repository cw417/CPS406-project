import styles from '../styles/AccountsOverview.module.css';
import { useState, useEffect } from 'react';

export default function AccountsOverview(props) {

    const customer = props.customer
    const [chequingAccounts, setChequingAccounts] = useState([])
    const [savingAccounts, setSavingAccounts] = useState([])
    
    async function openAccount(type) {
        customer.openAccount(type)
    }

    async function getAccounts(){
        customer.getAccounts().then((accounts) => {
            setChequingAccounts(accounts.cAccounts)
            setSavingAccounts(accounts.sAccounts)
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
                            <div className={styles.account} key={sAccount.id}>
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
                            <div className={styles.account} key={cAccount.id}>
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