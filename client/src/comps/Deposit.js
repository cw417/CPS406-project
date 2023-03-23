import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import DropdownStyles from '../styles/DropdownMenu.module.css'

export default function Deposit(props) {

    const sAccounts = props.sAccounts
    const cAccounts = props.cAccounts
    const accounts = sAccounts.concat(cAccounts)

    return(
        <>
            <h1>Deposit</h1>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className={DropdownStyles.Trigger}>Hello</DropdownMenu.Trigger>
                <DropdownMenu.Content className={DropdownStyles.Content} align='start'>
                    {accounts.map((account) => {
                        return <DropdownMenu.Item className={DropdownStyles.Item} onSelect={() => {}}>
                            <p>{account.accountType} Account - {account.id}</p>
                            <p>{account.accountBalance}</p>
                        </DropdownMenu.Item>
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    )
}