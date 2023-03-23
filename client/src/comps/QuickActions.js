import styles from '../styles/QuickActions.module.css'
import { useState } from 'react'
import Transfer from '../comps/Transfer'
import PayBills from '../comps/PayBills'
import Deposit from '../comps/Deposit'
import Withdraw from '../comps/Withdraw'

export default function QuickActions() {

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
                {currentAction === 'Deposit' ? <Deposit/> : <></>}
                {currentAction === 'Transfer' ? <Transfer/> : <></>}
                {currentAction === 'Pay' ? <PayBills/> : <></>}
                {currentAction === 'Withdraw' ? <Withdraw/> : <></>}
            </div>
        </>
    );
}