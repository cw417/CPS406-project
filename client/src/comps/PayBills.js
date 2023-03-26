import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import DropdownStyles from '../styles/DropdownMenu.module.css';
import { useState } from 'react'
import styles from "../styles/Deposit.module.css"
import { NavLink } from 'react-router-dom';

export default function PayBills(props) {
    const customer = props.customer   
    const sAccounts = props.sAccounts
    const cAccounts = props.cAccounts
    const accounts = sAccounts.concat(cAccounts)
    const payees = [{id: 1242, name: "Walmart"}];
    
    const [displayedAccount, setDisplayedAccount] = useState('Select Bank Account')
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [payAmount, setPayAmount] = useState(0);
    const [displayedPayee, setDisplayedPayee] = useState('Select Payee')
    const [selectedPayee, setSelectedPayee] = useState(null)

    function payBill() {
        if (payAmount > 0 && selectedAccount !== null) {
            console.log('Pay')
        }
    }

    return(
        <>
            <div className={styles.container}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger className={DropdownStyles.Trigger}>Bank Account: {displayedAccount}</DropdownMenu.Trigger>
                    <DropdownMenu.Content className={DropdownStyles.Content} align='start'>
                        {accounts.map((account) => {
                            return (<>
                            <DropdownMenu.Item className={DropdownStyles.Item} onSelect={() => {setDisplayedAccount(account.id); setSelectedAccount(account)}}>
                                <p>{account.accountType} Account - {account.id}</p>
                                <p>${account.accountBalance}</p>
                            </DropdownMenu.Item>
                            </>)
                        })}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                    <div>
                        <DropdownMenu.Trigger className={DropdownStyles.Trigger}>Payee: {displayedPayee}</DropdownMenu.Trigger>
                        <NavLink to='/contacts'>Add Contact</NavLink>
                    </div>
                    <DropdownMenu.Content className={DropdownStyles.Content} align='start'>
                        {payees.map((payee) => {
                            return (<>
                            <DropdownMenu.Item className={DropdownStyles.Item} onSelect={() => {setDisplayedPayee(payee.id); setSelectedPayee(payee)}}>
                                <p>{payee.name} - {payee.id}</p>
                            </DropdownMenu.Item>
                            </>)
                        })}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                Amount: <input type="number" onChange={(event) => setPayAmount(event.target.value)}/>
                <button type="submit" onClick={payBill}>Make Deposit</button>
            </div>
        </>
    )
}