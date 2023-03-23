import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import DropdownStyles from '../styles/DropdownMenu.module.css'
import styles from "../styles/Deposit.module.css"
import { useState } from 'react'
import Transaction from '../interfaces/Transaction'

export default function Deposit(props) {

    const sAccounts = props.sAccounts
    const cAccounts = props.cAccounts
    const accounts = sAccounts.concat(cAccounts)

    const [displayedAccount, setDisplayedAccount] = useState('Select Bank Account')
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [depositAmount, setDepositAmount] = useState(0);
    
    function makeDeposit() {
        if (depositAmount > -1 && selectedAccount !== null) {
            const transaction = new Transaction(depositAmount, selectedAccount.accountType,
                selectedAccount.id, "Cheque", "Deposit");
            selectedAccount.setAccountBalance(Number(selectedAccount.accountBalance + parseInt(depositAmount)));
            selectedAccount.addTransaction(transaction);
            selectedAccount.updateAccount();
        }
    }

    return(
        <>
            <div className={styles.container}>
                <input type="file" placeholder='Add Image'/>
                <input type="file" placeholder='Add Image'/>
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
                <input type="number" onChange={(event) => setDepositAmount(event.target.value)}/>
                <button type="submit" onClick={makeDeposit}>Make Deposit</button>
            </div>
        </>
    )
}