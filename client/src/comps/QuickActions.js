import styles from '../styles/QuickActions.module.css'
import { useState, useEffect } from 'react';
import Transfer from '../comps/Transfer'
import PayBills from '../comps/PayBills'
import Deposit from '../comps/Deposit'
import Withdraw from '../comps/Withdraw'

export default function QuickActions(props) {

    const customer = props.customer
    const [chequingAccounts, setChequingAccounts] = useState([])
    const [savingAccounts, setSavingAccounts] = useState([])

    async function getAccounts(){
        customer.getAccounts().then((accounts) => {
            setChequingAccounts(accounts.cAccounts)
            setSavingAccounts(accounts.sAccounts)
        })
    }  

    useEffect(() => {
        getAccounts()
    }, [])

    const [currentAction, setCurrentAction] = useState('Deposit')

    return (
        <>
            <div className={styles.container}>
                <h1>Quick Actions</h1>
                <div className={styles.options}>
                    <button className={styles.button} onClick={() => setCurrentAction('Transfer')}>Transfer</button>
                    <button className={styles.button} onClick={() => setCurrentAction('Pay')}>Pay Bills</button>
                    <button className={styles.button} onClick={() => setCurrentAction('Deposit')}>Deposit</button>
                    <button className={styles.button} onClick={() => setCurrentAction('Withdraw')}>Withdraw</button>
                </div>
                {currentAction === 'Deposit' ? <Deposit sAccounts={savingAccounts} cAccounts={chequingAccounts}/> : <></>}
                {currentAction === 'Transfer' ? <Transfer sAccounts={savingAccounts} cAccounts={chequingAccounts} /> : <></>}
                {currentAction === 'Pay' ? <PayBills/> : <></>}
                {currentAction === 'Withdraw' ? <Withdraw/> : <></>}
            </div>
        </>
    );
}