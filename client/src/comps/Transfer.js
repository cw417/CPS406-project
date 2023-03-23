import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import DropdownStyles from '../styles/DropdownMenu.module.css';
import { useRef, useState } from 'react';
import Transaction from '../interfaces/Transaction';

export default function Transfer(props) {

    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const sAccounts = props.sAccounts
    const cAccounts = props.cAccounts
    const accounts = sAccounts.concat(cAccounts)
    const amountRef = useRef();

    function handleTransfer() {
        const amount = amountRef.current.value;
        const newTransaction = new Transaction(amount, 'TRANSFER', toAccount, fromAccount);
        console.log(amount);
    }

    return(
        <>
            <h1>Transfer</h1>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className={DropdownStyles.Trigger}>From: Select Account</DropdownMenu.Trigger>
                <DropdownMenu.Content className={DropdownStyles.Content} align='start'>
                    {accounts.map((account) => {
                        return <DropdownMenu.Item className={DropdownStyles.Item} onSelect={() => { setFromAccount(account.id) }}>
                            <p>{account.accountType} Account - {account.id}</p>
                            <p>{account.accountBalance}</p>
                        </DropdownMenu.Item>
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className={DropdownStyles.Trigger}>To: Select Account</DropdownMenu.Trigger>
                <DropdownMenu.Content className={DropdownStyles.Content} align='start'>
                    {accounts.map((account) => {
                        return <DropdownMenu.Item className={DropdownStyles.Item} onSelect={() => { setToAccount(account.id) }}>
                            <p>{account.accountType} Account - {account.id}</p>
                            <p>{account.accountBalance}</p>
                        </DropdownMenu.Item>
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <div>
                <label>Amount: </label><input ref={amountRef} type='text' />
                <div><button onClick={handleTransfer}>Transfer</button> </div>
            </div>
        </>
    )
}